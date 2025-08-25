import crypto from 'crypto';

import { IVerifyPaymentUsecase } from "entities/usecaseInterfaces/payment/verifyPaymentUsecase.interface";
import { IBookReviewUsecase } from "entities/usecaseInterfaces/review/bookReviewUsecase.interface";
import { ICreateTransactionUsecase } from "entities/usecaseInterfaces/transaction/createTransactionUsecase.interface";
import { ICreditWalletUsecase } from "entities/usecaseInterfaces/wallet/creditWalletUsecase.inteface";
import { config } from "shared/config";
import { HTTP_STATUS, TRANSACTION_TYPE } from "shared/constants";
import { VerifyPaymentReqDTO } from 'shared/dto/request/payment.dto';
import { CustomError } from "shared/utils/error/customError";
import { inject, injectable } from "tsyringe";

@injectable()
export class VerifyPaymentUsecase implements IVerifyPaymentUsecase{

    private _adminId:string
    constructor(
        @inject('IBookReviewUsecase')
        private _bookReviewUsecase:IBookReviewUsecase,

        @inject('ICreateTransactionUsecase')
        private _createTransactionUsecase:ICreateTransactionUsecase,

        @inject('ICreditWalletUsecase')
        private _creditWalletUsecase:ICreditWalletUsecase,
    ){
        this._adminId=config.ADMIN_ID!
    }
    async execute(studentId:string,paymentAndReviewDetails:VerifyPaymentReqDTO):Promise<void>{
        
        const {razorPayDetails,reviewDetails}=paymentAndReviewDetails
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

        const adminTransaction={
            walletId:this._adminId,
            reviewId:bookedReview._id,
            type:TRANSACTION_TYPE.CREDIT,
            amount:reviewDetails.amount,
            description:`Amount ${reviewDetails.amount} has been credited for review booked by ${studentId}`
        }
        const studentTransaction={
            walletId:studentId,
            reviewId:bookedReview._id,
            type:TRANSACTION_TYPE.DEBIT,
            amount:reviewDetails.amount,
            description:`Amount ${reviewDetails.amount} has been debited for review booked by ${studentId}`
        }

        asyncOperation.push(this._createTransactionUsecase.execute(adminTransaction))
        asyncOperation.push(this._createTransactionUsecase.execute(studentTransaction))
        asyncOperation.push(this._bookReviewUsecase.save(bookedReview))
        asyncOperation.push(this._creditWalletUsecase.execute(this._adminId,reviewDetails.amount));
        await Promise.all(asyncOperation)
    }
}