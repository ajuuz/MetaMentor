import { IReviewRepository } from "entities/repositoryInterfaces/reviewRepository.interface";
import { IPushNotificationService } from "entities/serviceInterfaces/pushNotificationService.interface";
import { ICancelReviewByStudentUsecase } from "entities/usecaseInterfaces/review/cancelReviewByStudentUsecase.interface";
import { ICreateTransactionUsecase } from "entities/usecaseInterfaces/transaction/createTransactionUsecase.interface";
import { ICreditWalletUsecase } from "entities/usecaseInterfaces/wallet/creditWalletUsecase.inteface";
import { IDebitWalletUsecase } from "entities/usecaseInterfaces/wallet/debitWalletUsecase.interface";
import { config } from "shared/config";
import { ERROR_MESSAGE, HTTP_STATUS, NOTIFICATION_MESSAGE, NOTIFICATION_TITLE, REVIEW_STATUS, TRANSACTION_TYPE } from "shared/constants";
import { CustomError } from "shared/utils/error/customError";
import { NotFoundError } from "shared/utils/error/notFounError";
import { inject, injectable } from "tsyringe";


@injectable()
export class CancelReviewByStudentUsecase implements ICancelReviewByStudentUsecase{

    private _adminId:string;
    constructor(
        @inject('IReviewRepository')
        private _reviewRepository:IReviewRepository,

        @inject('IPushNotificationService')
        private _pushNotificationService:IPushNotificationService,

         @inject('ICreateTransactionUsecase')
        private _createTransactionUsecase:ICreateTransactionUsecase,

        @inject('ICreditWalletUsecase')
        private _creditWalletUsecase:ICreditWalletUsecase,

        @inject('IDebitWalletUsecase')
        private _debitWalletUsecase:IDebitWalletUsecase,
    ){
        this._adminId=config.ADMIN_ID!
    }

    async execute(studentId:string,reviewId:string):Promise<void>{

        const fetchFilter={_id:reviewId,status:REVIEW_STATUS.PENDING}
        const review = await this._reviewRepository.findOne(fetchFilter)
        if(!review){
            throw new NotFoundError()
        }

        const currentDate = new Date()
        const slotStartTime = new Date(review.slot.isoStartTime); 

        const diffInMs = slotStartTime.getTime() - currentDate.getTime(); 
        const diffInHours = diffInMs / (1000 * 60 * 60); 

        if(diffInHours<2){
             throw new CustomError(HTTP_STATUS.BAD_REQUEST,ERROR_MESSAGE.REVIEW.CANCEL_ERROR)
        }

        const filter={studentId,reviewId}
        const update={status:REVIEW_STATUS.CANCELLED}
        const cancelledReview = await this._reviewRepository.updateReview(filter,update)
        if(!cancelledReview){
            throw new NotFoundError();
        }
        const mentorId=cancelledReview.mentorId.toString()
        const asyncOperations=[]
        asyncOperations.push(this._pushNotificationService.sendNotification(mentorId,NOTIFICATION_TITLE.REVIEW_CANCEL,NOTIFICATION_MESSAGE.REVIEW_CANCEL_STUDENT))

        const transactionAmount=cancelledReview.mentorEarning;
         const adminTransaction={
            walletId:this._adminId,
            reviewId:cancelledReview._id.toString(),
            type:TRANSACTION_TYPE.DEBIT,
            amount:transactionAmount,
            description:`Amount ${transactionAmount} has been debited for review cancellation by mentor`
        }

        const studentTransaction={
            walletId:cancelledReview.studentId.toString(),
            reviewId:cancelledReview._id.toString(),
            type:TRANSACTION_TYPE.CREDIT,
            amount:transactionAmount,
            description:`Amount ${transactionAmount} has been credited for review cancellation by mentor`
        }
        asyncOperations.push(this._createTransactionUsecase.execute(adminTransaction))
        asyncOperations.push(this._createTransactionUsecase.execute(studentTransaction))
        asyncOperations.push(this._creditWalletUsecase.execute(cancelledReview.studentId.toString(),transactionAmount));
        asyncOperations.push(this._debitWalletUsecase.execute(this._adminId,transactionAmount));
        await Promise.all(asyncOperations)
    }
}