import { plainToInstance } from "class-transformer";
import { IReviewRepository } from "entities/repositoryInterfaces/reviewRepository.interface";
import { IGetReviewForMentorUsecase } from "entities/usecaseInterfaces/review/getReviewForMentorUsecase.interface";
import { GetReviewForMentResDTO } from "shared/dto/response/review.dto";
import { NotFoundError } from "shared/utils/error/notFounError";
import { inject, injectable } from "tsyringe";



@injectable()
export class GetReviewForMentorUsecase implements IGetReviewForMentorUsecase{

    constructor(
        @inject('IReviewRepository')
        private _reviewRepository:IReviewRepository
    ){}

    async execute(mentorId:string,reviewId:string):Promise<GetReviewForMentResDTO>{

        const data =await this._reviewRepository.findReviewForMentor(mentorId,reviewId)
        const review = plainToInstance(GetReviewForMentResDTO,data,{
            excludeExtraneousValues:true
        })
        if(!review){
            throw new NotFoundError('Review Not found');
        }

        return review
    }
}