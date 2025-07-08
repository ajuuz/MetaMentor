

export interface IEnrollDomainUsecase{

    execute(userId:string,domainId:string):Promise<void>
}