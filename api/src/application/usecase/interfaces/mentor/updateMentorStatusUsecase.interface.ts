

export interface IUpdateMentorStatusUsecase{

    execute(mentorId:string,status:boolean):Promise<void>
}