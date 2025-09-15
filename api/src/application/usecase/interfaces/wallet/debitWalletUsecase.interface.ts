

export interface IDebitWalletUsecase{
    execute(userId:string,amount:number):Promise<void>
}