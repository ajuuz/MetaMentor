import { IReviewRepository } from "entities/repositoryInterfaces/reviewRepository.interface";
import { IBookReviewUsecase } from "entities/usecaseInterfaces/review/bookReviewUsecase.interface";
import { IReviewModel } from "frameworks/database/models/bookedSlot.model";
import { PAYMENT_METHOD, PAYMENT_STATUS } from "shared/constants";
import { BookReviewDTO } from "shared/dto/reviewDTO";
import { inject, injectable } from "tsyringe";


@injectable()
export class BookReviewUsecase implements IBookReviewUsecase{


    constructor(
        @inject('IReviewRepository')
        private _reviewRepository:IReviewRepository
    ){}

    async create(studentId:string,reviewDetails:BookReviewDTO):Promise<IReviewModel>{
        const amount=reviewDetails.amount!
        const commissionAmount = (amount*10)/100;
        const mentorEarning = amount-commissionAmount;
        const payment={
            method:PAYMENT_METHOD.UPI,
            status:PAYMENT_STATUS.SUCCESS
        }
        const bookingDetails:Omit<BookReviewDTO,'amount'>={
            domainId:reviewDetails.domainId,
            levelId:reviewDetails.levelId,
            mentorId:reviewDetails.mentorId,
            slot:reviewDetails.slot,
            studentId,
            commissionAmount,
            mentorEarning,
            payment
        }


        const review=await this._reviewRepository.createReview(bookingDetails)
        return review
    }

    async save(review:IReviewModel):Promise<void>{
        await this._reviewRepository.save(review)
    }
}