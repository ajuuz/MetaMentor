

export interface IForgotPasswordResetUsecase{
    execute(password:string,token:string):Promise<void>
}