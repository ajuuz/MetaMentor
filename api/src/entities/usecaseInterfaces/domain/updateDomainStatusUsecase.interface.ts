

export interface IUpdateDomainStatusUsecase{
    execute(domainId:string,status:boolean):Promise<void>
}