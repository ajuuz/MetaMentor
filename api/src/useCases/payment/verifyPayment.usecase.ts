import { IVerifyPaymentUsecase } from "entities/usecaseInterfaces/payment/verifyPaymentUsecase.interface";
import { VerifyPaymentDTO } from "shared/dto/paymentDTO";
import crypto from 'crypto';
import { config } from "shared/config";
import { CustomError } from "shared/utils/error/customError";
import { HTTP_STATUS, TRANSACTION_TYPE } from "shared/constants";
import { inject, injectable } from "tsyringe";
import { IBookReviewUsecase } from "entities/usecaseInterfaces/review/bookReviewUsecase.interface";
import { ICreateTransactionUsecase } from "entities/usecaseInterfaces/transaction/createTransactionUsecase.interface";
import { ICreditToAdminWalletUsecase } from "entities/usecaseInterfaces/wallet/creditToAdminWalletUsecase.inteface";

@injectable()
export class VerifyPaymentUsecase implements IVerifyPaymentUsecase{

    private _adminId:string
    constructor(
        @inject('IBookReviewUsecase')
        private _bookReviewUsecase:IBookReviewUsecase,

        @inject('ICreateTransactionUsecase')
        private _createTransactionUsecase:ICreateTransactionUsecase,

        @inject('ICreditToAdminWalletUsecase')
        private _creditToAdminWalletUsecase:ICreditToAdminWalletUsecase,
    ){
        this._adminId=config.ADMIN_ID!
    }
    async execute(studentId:string,{razorPayDetails,reviewDetails}:VerifyPaymentDTO):Promise<void>{
        
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = razorPayDetails;
        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto
        .createHmac('sha256',config.RAZORPAY.RAZORPAY_KEY_SECRET)
        .update(sign.toString())
        .digest('hex');

        if (razorpay_signature !== expectedSign) {
             throw new CustomError(HTTP_STATUS.BAD_REQUEST,"Invalid payment signature")
        }

        const bookedReview = await this._bookReviewUsecase.create(studentId,reviewDetails);
        const asyncOperation = [];
        const adminTransaction={walletId:this._adminId,reviewId:bookedReview._id,type:TRANSACTION_TYPE.CREDIT,amount:reviewDetails.amount,description:`Amount ${reviewDetails.amount} has been credited for review booked by ${studentId}`}
        asyncOperation.push(this._createTransactionUsecase.execute(adminTransaction))
        const studentTransaction={walletId:studentId,reviewId:bookedReview._id,type:TRANSACTION_TYPE.DEBIT,amount:reviewDetails.amount,description:`Amount ${reviewDetails.amount} has been debited for review booked by ${studentId}`}
        asyncOperation.push(this._createTransactionUsecase.execute(studentTransaction))
        
        asyncOperation.push(this._bookReviewUsecase.save(bookedReview))
        asyncOperation.push(this._creditToAdminWalletUsecase.execute(reviewDetails.amount));
        await Promise.all(asyncOperation)
    }
}