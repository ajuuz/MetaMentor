import { GetStudentReviewResponseDTO } from "shared/dto/reviewDTO";


export interface IGetStudentReviewsUsecase{
    execute(studentId:string,type:'upcoming'|'completed'):Promise<GetStudentReviewResponseDTO[]>
}