import { ObjectId } from "mongoose"


export interface ILevelEntity{
    _id:ObjectId
    domainId:ObjectId
    name:string
    description:string,
    taskFile:string
}