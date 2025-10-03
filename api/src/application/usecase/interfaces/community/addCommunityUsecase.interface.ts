

export interface IAddCommunityUsecase{
    execute(domainId:string,name:string):Promise<void>
}