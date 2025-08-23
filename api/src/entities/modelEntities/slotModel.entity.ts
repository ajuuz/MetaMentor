export interface ISlotEntity{
    _id:string,
    mentorId:string,
    weekSlots:IWeekEntity
}

export interface IWeekEntity{
    Monday:ISlotTime[],
    Tuesday:ISlotTime[],
    Wednesday:ISlotTime[],
    Thursday:ISlotTime[],
    Friday:ISlotTime[],
    Saturday:ISlotTime[]
    Sunday:ISlotTime[]
}

export interface ISlotTime{
    _id:string,
    start:number;
    end:number;
    enabled:boolean
}