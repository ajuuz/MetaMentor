import { IBaseRepository } from "entities/repositoryInterfaces/baseRepository.interface";
import { Document, FilterQuery, Model, ObjectId } from "mongoose";

export class BaseRepository<T,D extends Document> implements IBaseRepository<T,D>{

    constructor(protected model:Model<D>){}

    async insertMany(documents:Omit<T,'_id'>[]):Promise<void>{
        await this.model.insertMany(documents)
    }

     create(newDocument:Partial<T>):D{
        const document = new this.model(newDocument);
        console.log(document)
        return document
    }

    async save(document:D):Promise<void>{
        await document.save()
    }
    
    async insertOne(newDocument:Omit<T,'_id'>):Promise<void>{
       await this.model.create(newDocument)
    }

    async find(filter:FilterQuery<T>={},skip=0,limit=10,sort:any){
        const [items,totalDocuments]  = await Promise.all([
            this.model.find(filter).skip(skip).sort(sort).limit(limit).lean() as Promise<T[]>,
            this.model.countDocuments(filter)
        ])

        return {items,totalDocuments}
    }

   
}