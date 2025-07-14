import { ObjectId } from "mongoose";


export interface ISlotEntity{
    _id:ObjectId,
    mentorId:ObjectId,
    week:IWeekEntity
}

interface IWeekEntity{
    Monday:{start:string,end:string,enabled:boolean}[],
    Tuesday:{start:string,end:string,enabled:boolean}[],
    Wednesday:{start:string,end:string,enabled:boolean}[],
    Thursday:{start:string,end:string,enabled:boolean}[],
    Friday:{start:string,end:string,enabled:boolean}[],
    Saturday:{start:string,end:string,enabled:boolean}[]
    Sunday:{start:string,end:string,enabled:boolean}[]
}