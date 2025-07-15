
export type DayOfWeekType ='Monday'|'Tuesday'|'Wednesday'|'Thursday'|'Friday'|'Saturday'|'Sunday';

export type WeekSlotsType={
    Monday:{_id:string,start:string,end:string,enabled:boolean}[],
    Tuesday:{_id:string,start:string,end:string,enabled:boolean}[],
    Wednesday:{_id:string,start:string,end:string,enabled:boolean}[],
    Thursday:{_id:string,start:string,end:string,enabled:boolean}[],
    Friday:{_id:string,start:string,end:string,enabled:boolean}[],
    Saturday:{_id:string,start:string,end:string,enabled:boolean}[]
    Sunday:{_id:string,start:string,end:string,enabled:boolean}[]
}
export type SlotType={
    _id:string,
    mentorId:string,
    weekSlots:WeekSlotsType
}
