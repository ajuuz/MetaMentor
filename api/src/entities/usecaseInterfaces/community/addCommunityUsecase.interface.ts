import { ObjectId } from "mongoose";


export interface IAddCommunityUsecase{
    execute(domainId:ObjectId,name:string):Promise<void>
}