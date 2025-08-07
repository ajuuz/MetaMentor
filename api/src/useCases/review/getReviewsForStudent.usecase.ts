import { IReviewRepository } from "entities/repositoryInterfaces/reviewRepository.interface";
import { ILoggerService } from "entities/serviceInterfaces/loggerService.interface";
import { IGetReviewsForStudentUsecase } from "entities/usecaseInterfaces/review/getReviewsForStudentUsecase.interface";
import { PENDING_REVIEW_STATE, REVIEW_FILTER_STATUS, REVIEW_STATUS } from "shared/constants";
import { ReviewsDataForStudentResponseDTO } from "shared/dto/reviewDTO";
import { dateRangeCalculator } from "shared/utils/dateRangeCalculator";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetReviewsForStudentUsecase implements IGetReviewsForStudentUsecase{

    constructor(
        @inject('IReviewRepository')
        private _reviewRepository:IReviewRepository,

        @inject('ILoggerService')
        private _logger:ILoggerService
    ){}

    async execute(studentId:string,status:REVIEW_FILTER_STATUS,dateRange:string,currentPage:number,limit:number,pendingReviewState?:PENDING_REVIEW_STATE|undefined):Promise<Omit<ReviewsDataForStudentResponseDTO,'totalDocuments'>>{
        const skip:number=(currentPage-1)*limit;
        let filter:any={studentId};
        switch(status){
            case REVIEW_FILTER_STATUS.COMPLETED:
                filter.status=[REVIEW_STATUS.PASS,REVIEW_STATUS.FAIL]
                break;
            
            case REVIEW_FILTER_STATUS.PASS:
                filter.status=[REVIEW_STATUS.PASS]
                break;

            case REVIEW_FILTER_STATUS.FAIL:
                filter.status=[REVIEW_STATUS.FAIL]
                break;
            
            case REVIEW_FILTER_STATUS.CANCELLED:
                filter.status=[REVIEW_STATUS.CANCELLED]
                break;

            default:
                filter.status=[REVIEW_STATUS.PENDING]
                break;
        }

        if(dateRange!=='all'){
            const {start,end} = dateRangeCalculator(dateRange)
            filter.dateRange={start,end}
        }

        if(pendingReviewState){
            filter.pendingReviewState=pendingReviewState
        }

        const {reviews,totalDocuments} = await this._reviewRepository.findReviewsForStudent(filter,skip,limit)
        const totalPages = Math.ceil(totalDocuments/limit);
        return {reviews,totalPages}
        // this._logger.debug('',reviews)
    }
}