import { ObjectId } from "mongoose"


export type levelDTO={
    name:string,
    domainId:ObjectId
    description:string,
    taskFile:string
}