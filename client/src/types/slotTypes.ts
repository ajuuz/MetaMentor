
export type DayOfWeekType ='Monday'|'Tuesday'|'Wednesday'|'Thursday'|'Friday'|'Saturday'|'Sunday';

export type WeekSlotsType={
    Monday:{_id:string,start:number,end:number,enabled:boolean}[],
    Tuesday:{_id:string,start:number,end:number,enabled:boolean}[],
    Wednesday:{_id:string,start:number,end:number,enabled:boolean}[],
    Thursday:{_id:string,start:number,end:number,enabled:boolean}[],
    Friday:{_id:string,start:number,end:number,enabled:boolean}[],
    Saturday:{_id:string,start:number,end:number,enabled:boolean}[]
    Sunday:{_id:string,start:number,end:number,enabled:boolean}[]
}
export type SlotType={
    _id:string,
    mentorId:string,
    weekSlots:WeekSlotsType
}


export type DomainSlotsResponseDTO={
    weekSlots:WeekSlotsType,
    mentor:{
        _id:string,
        name:string,
        profileImage:string,
        country:string|null,
        about:string,
        skills:string[],
        workedAt:string[]
    }
}