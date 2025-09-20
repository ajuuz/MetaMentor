
export interface IUpdateStudentStatusUsecase{
    execute(userId:string,status:boolean):Promise<void>
}