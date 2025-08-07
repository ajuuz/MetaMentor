

export interface ILogoutUsecase{
    execute(userId:string):Promise<void>
}