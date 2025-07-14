
export type DayOfWeekType ='Monday'|'Tuesday'|'Wednesday'|'Thursday'|'Friday'|'Saturday'|'Sunday';

export type WeekSlotType={
    Monday:{start:string,end:string,enabled:boolean}[],
    Tuesday:{start:string,end:string,enabled:boolean}[],
    Wednesday:{start:string,end:string,enabled:boolean}[],
    Thursday:{start:string,end:string,enabled:boolean}[],
    Friday:{start:string,end:string,enabled:boolean}[],
    Saturday:{start:string,end:string,enabled:boolean}[]
    Sunday:{start:string,end:string,enabled:boolean}[]
}
export type SlotType={
    _id:string,
    mentorId:string,
    weekSlots:WeekSlotType
}
