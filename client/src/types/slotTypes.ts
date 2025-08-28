
export type DayOfWeekType ='Monday'|'Tuesday'|'Wednesday'|'Thursday'|'Friday'|'Saturday'|'Sunday';

export type Slot={
    _id:string,
    start:number,
    end:number,
    enabled:boolean,
    isBooked?:boolean
}

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

export type WeekSlotsWithBookingType={
    Monday:{_id:string,start:number,end:number,enabled:boolean,isBooked:boolean}[],
    Tuesday:{_id:string,start:number,end:number,enabled:boolean,isBooked:boolean}[],
    Wednesday:{_id:string,start:number,end:number,enabled:boolean,isBooked:boolean}[],
    Thursday:{_id:string,start:number,end:number,enabled:boolean,isBooked:boolean}[],
    Friday:{_id:string,start:number,end:number,enabled:boolean,isBooked:boolean}[],
    Saturday:{_id:string,start:number,end:number,enabled:boolean,isBooked:boolean}[]
    Sunday:{_id:string,start:number,end:number,enabled:boolean,isBooked:boolean}[]
}

export type DomainSlotsResponseDTO={
    mentorId:string,
    weekSlots:WeekSlotsWithBookingType,
    mentor:{
        _id:string,
        name:string,
        profileImage:string,
        country:string|null,
        about:string,
        skills:string[],
        workedAt:string[],
        fee:number
    }
}