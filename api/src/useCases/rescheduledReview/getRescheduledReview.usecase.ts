import { IRescheduleReviewEntity } from "entities/modelEntities/rescheduleReviewModel.entity";
import { IRescheduleReviewRepository } from "entities/repositoryInterfaces/rescheduleReviewRepository.interface";
import { IGetRescheduledReviewUsecase } from "entities/usecaseInterfaces/rescheduledReview/getRescheduledReviewUsecase.interface";
import { NotFoundError } from "shared/utils/error/notFounError";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetRescheduledReviewUsecase implements IGetRescheduledReviewUsecase{

    constructor(
        @inject('IRescheduleReviewRepository')
        private _rescheduleReviewRepository:IRescheduleReviewRepository
    ){}
    async execute(reviewId:string):Promise<IRescheduleReviewEntity>{
        const rescheduledReview=await this._rescheduleReviewRepository.findOne({reviewId})
        if(!rescheduledReview) throw new NotFoundError()
        return rescheduledReview
    }
}