import { ObjectId } from "mongoose";


export interface IMentorSlotEntity{
    _id:ObjectId,
    mentorId:ObjectId,
    slots:{
        Monday:IOneSlotEntity[]
        Tuesday:IOneSlotEntity[]
        Wednesday:IOneSlotEntity[]
        Thursday:IOneSlotEntity[]
        Friday:IOneSlotEntity[]
        Saturday:IOneSlotEntity[]
        Sunday:IOneSlotEntity[]
    }
}


interface IOneSlotEntity{
    start:string,
    end:string,
    enabled:boolean
}