


export interface IRejectMentorApplicationUsecase{
    execute(mentorId:string,email:string,reason:string):Promise<void>
}