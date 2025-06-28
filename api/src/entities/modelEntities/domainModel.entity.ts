import { ObjectId } from "mongoose";


export interface IDomainEntity{
    _id:ObjectId,
    name:string,
    image:string,
    description:string,
    motive:string,
}