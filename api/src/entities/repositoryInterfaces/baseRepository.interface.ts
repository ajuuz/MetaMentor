import { ClientSession, Document, FilterQuery, InsertManyOptions, ObjectId, QueryOptions } from "mongoose"

export interface IBaseRepository<T,D>{
    startSession():Promise<ClientSession>
    insertMany(documents:Omit<T,'_id'>[],options?:InsertManyOptions):Promise<void>
    create(newDocument:Partial<T>):D
    save(document:D,options?:QueryOptions):Promise<void>
    insertOne(newDocument:Partial<Omit<T,'_id'>>,options?:QueryOptions):Promise<void>
    find(filter:FilterQuery<T>,skip:number,limit:number,sort:any):Promise<{items:T[],totalDocuments:number}>
}