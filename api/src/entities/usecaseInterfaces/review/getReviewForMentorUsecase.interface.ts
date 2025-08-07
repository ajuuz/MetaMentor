import { ReviewDataForMentorResponseDTO } from "shared/dto/reviewDTO";



export interface IGetReviewForMentorUsecase{

    execute(mentorId:string,reviewId:string):Promise<ReviewDataForMentorResponseDTO>
}