


export interface IUpdateCommunityStatusUsecase{
    execute(communityId:string,status:boolean):Promise<void>
}