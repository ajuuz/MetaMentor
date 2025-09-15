

export interface ICancelReviewByStudentUsecase{
    execute(studentId:string,reviewId:string):Promise<void>
}