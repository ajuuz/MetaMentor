

export interface IAcceptMentorApplicationUsecase{
    execute(mentorId:string,email:string):Promise<void>
}