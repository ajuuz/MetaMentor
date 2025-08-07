import { IReviewRepository } from "entities/repositoryInterfaces/reviewRepository.interface";
import { IPushNotificationService } from "entities/serviceInterfaces/pushNotificationService.interface";
import { ISubmitReviewFeedBackUsecase } from "entities/usecaseInterfaces/review/submitReviewFeedBackUsecase.interface";
import { ERROR_MESSAGE, NOTIFICATION_MESSAGE, NOTIFICATION_TITLE, REVIEW_STATUS } from "shared/constants";
import { NotFoundError } from "shared/utils/error/notFounError";
import { ValidationError } from "shared/utils/error/validationError";
import { inject, injectable } from "tsyringe";


@injectable()
export class SubmitReviewFeedBackUsecase implements ISubmitReviewFeedBackUsecase{
    constructor(
        @inject('IReviewRepository')
        private _reviewRepository:IReviewRepository,

        @inject('IPushNotificationService')
        private _pushNotificationService:IPushNotificationService,
    ){}

    async execute(mentorId:string,reviewId:string,status:Exclude<REVIEW_STATUS,REVIEW_STATUS.CANCELLED|REVIEW_STATUS.PENDING>,feedBack:string):Promise<void>{

        console.log("usecase")
        if(![REVIEW_STATUS.PASS,REVIEW_STATUS.FAIL].includes(status)){
            throw new ValidationError(ERROR_MESSAGE.REVIEW.INVALID_STATUS);
        }

        const filter={mentorId,reviewId}
        const update={status,feedBack}
        const updatedReview = await this._reviewRepository.updateReview(filter,update)
        if(!updatedReview){
            throw new NotFoundError();
        }
        const userId=updatedReview.studentId.toString()
        this._pushNotificationService.sendNotification(userId,NOTIFICATION_TITLE.REVIEW_FEEDBACK_UPDATED,NOTIFICATION_MESSAGE.REVIEW_FEEDBACK_UPDATED)
    }
}