import { ObjectId } from "mongoose";


export interface ISlotEntity{
    _id:ObjectId,
    mentorId:ObjectId,
    weekSlots:IWeekEntity
}

interface IWeekEntity{
    Monday:{_id:ObjectId,start:string,end:string,enabled:boolean}[],
    Tuesday:{_id:ObjectId,start:string,end:string,enabled:boolean}[],
    Wednesday:{_id:ObjectId,start:string,end:string,enabled:boolean}[],
    Thursday:{_id:ObjectId,start:string,end:string,enabled:boolean}[],
    Friday:{_id:ObjectId,start:string,end:string,enabled:boolean}[],
    Saturday:{_id:ObjectId,start:string,end:string,enabled:boolean}[]
    Sunday:{_id:ObjectId,start:string,end:string,enabled:boolean}[]
}