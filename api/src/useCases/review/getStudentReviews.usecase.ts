import { IReviewRepository } from "entities/repositoryInterfaces/reviewRepository.interface";
import { IGetStudentReviewsUsecase } from "entities/usecaseInterfaces/review/getStudentReviewsUsecase.interface";
import { REVIEW_STATUS } from "shared/constants";
import { GetStudentReviewResponseDTO } from "shared/dto/reviewDTO";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetStudentReviewsUsecase implements IGetStudentReviewsUsecase{

    constructor(
        @inject('IReviewRepository')
        private _reviewRepository:IReviewRepository
    ){}

    async execute(studentId:string,type:'upcoming'|'completed'):Promise<GetStudentReviewResponseDTO[]>{

        let status=[];
        if(type==='upcoming'){
            status.push(REVIEW_STATUS.PENDING)
        }else{
            status.push(REVIEW_STATUS.PASS,REVIEW_STATUS.FAIL,REVIEW_STATUS.CANCELLED)
        }
        const reviews = await this._reviewRepository.findByStudentId(studentId,status)
        return reviews
    }
}