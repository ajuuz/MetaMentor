import { Document, FilterQuery, ObjectId } from "mongoose"

export interface IBaseRepository<T,D>{
    insertMany(documents:Omit<T,'_id'>[]):Promise<void>
    create(newDocument:Partial<T>):D
    save(document:D):Promise<void>
    insertOne(newDocument:Omit<T,'_id'>):Promise<void>
    find(filter:FilterQuery<T>,skip:number,limit:number,sort:any):Promise<{items:T[],totalDocuments:number}>
}