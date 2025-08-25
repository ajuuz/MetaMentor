import { ClientSession,FilterQuery,InsertManyOptions, ProjectionType, QueryOptions } from "mongoose"

export interface IBaseRepository<T,D>{
    startSession():Promise<ClientSession>
    insertMany(documents:Omit<T,'_id'>[],options?:InsertManyOptions):Promise<void>
    create(newDocument:Partial<T>):D
    save(document:D,options?:QueryOptions):Promise<void>
    insertOne(newDocument:Partial<Omit<T,'_id'>>,options?:QueryOptions):Promise<void>
    find(filter:FilterQuery<T>,skip:number,limit:number,sort:any):Promise<{items:T[],totalDocuments:number}>
    findWhole(filter:FilterQuery<T>,projection?:ProjectionType<T>):Promise<T[]>
    findUsingIn(field:keyof T,items:any[],skip:number,limit:number):Promise<{documents:T[],totalDocuments:number}>
    findOne(filter:FilterQuery<T>,projection?:ProjectionType<T>):Promise<T|null>
}