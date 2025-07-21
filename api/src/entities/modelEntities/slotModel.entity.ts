import { ObjectId } from "mongoose";



export interface ISlotEntity{
    _id:ObjectId,
    mentorId:ObjectId,
    weekSlots:IWeekEntity
}

export interface IWeekEntity{
    Monday:{_id:ObjectId,start:number,end:number,enabled:boolean}[],
    Tuesday:{_id:ObjectId,start:number,end:number,enabled:boolean}[],
    Wednesday:{_id:ObjectId,start:number,end:number,enabled:boolean}[],
    Thursday:{_id:ObjectId,start:number,end:number,enabled:boolean}[],
    Friday:{_id:ObjectId,start:number,end:number,enabled:boolean}[],
    Saturday:{_id:ObjectId,start:number,end:number,enabled:boolean}[]
    Sunday:{_id:ObjectId,start:number,end:number,enabled:boolean}[]
}