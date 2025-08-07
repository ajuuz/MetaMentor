


export interface ICreditWalletUsecase{
    execute(userId:string,amount:number):Promise<void>
}