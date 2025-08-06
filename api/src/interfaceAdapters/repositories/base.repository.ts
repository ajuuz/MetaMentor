import { IBaseRepository } from "entities/repositoryInterfaces/baseRepository.interface";
import { ClientSession, Document, FilterQuery, InsertManyOptions, Model, ObjectId, ProjectionType, QueryOptions } from "mongoose";

export class BaseRepository<T,D extends Document> implements IBaseRepository<T,D>{

    constructor(protected model:Model<D>){}

    async startSession():Promise<ClientSession>{
        console.log(this.model.db)
        return this.model.db.startSession();
    }

    
    create(newDocument:Partial<T>):D{
        const document = new this.model(newDocument);
        return document
    }
    
    async save(document:D,options?:QueryOptions):Promise<void>{
        await document.save(options)
    }
    
    async insertMany(documents:Omit<T,'_id'>[],options?:InsertManyOptions):Promise<void>{
        if(options)
            await this.model.insertMany(documents,options)
        else
            await this.model.insertMany(documents)
    }

    async insertOne(newDocument:Partial<Omit<T,'_id'>>,options?:QueryOptions):Promise<void>{
       await this.model.create(newDocument)
    }

    async find(filter:FilterQuery<T>={},skip=0,limit=10,sort:any){
        const [items,totalDocuments]  = await Promise.all([
            this.model.find(filter).skip(skip).sort(sort).limit(limit).lean() as Promise<T[]>,
            this.model.countDocuments(filter)
        ])

        return {items,totalDocuments}
    }

    async findWhole(filter:FilterQuery<T>,projection?:ProjectionType<T>):Promise<T[]>{
        return await this.model.find(filter,projection)
    }

    async findUsingIn(field:keyof T,items:any[],skip:number,limit:number):Promise<{documents:T[],totalDocuments:number}>{
        const filter={[field]:{$in:items}} as FilterQuery<T>
        const [documents,totalDocuments]=await Promise.all([
            this.model.find(filter).skip(skip).limit(limit).lean() as Promise<T[]>,
            this.model.countDocuments(filter)
        ])

        return {documents,totalDocuments}
    }

    async findOne(filter:FilterQuery<T>,projection?:ProjectionType<T>):Promise<T|null>{
        const data = await this.model.findOne(filter,projection).lean<T>()
        return data
    }
   
}