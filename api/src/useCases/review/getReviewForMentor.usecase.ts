import { IReviewRepository } from "entities/repositoryInterfaces/reviewRepository.interface";
import { IGetReviewForMentorUsecase } from "entities/usecaseInterfaces/review/getReviewForMentorUsecase.interface";
import { ReviewDataForMentorResponseDTO } from "shared/dto/reviewDTO";
import { NotFoundError } from "shared/utils/error/notFounError";
import { inject, injectable } from "tsyringe";



@injectable()
export class GetReviewForMentorUsecase implements IGetReviewForMentorUsecase{

    constructor(
        @inject('IReviewRepository')
        private _reviewRepository:IReviewRepository
    ){}

    async execute(mentorId:string,reviewId:string):Promise<ReviewDataForMentorResponseDTO>{

        const review =await this._reviewRepository.findReviewForMentor(mentorId,reviewId)
        if(!review){
            throw new NotFoundError('Review Not found');
        }

        return review
    }
}