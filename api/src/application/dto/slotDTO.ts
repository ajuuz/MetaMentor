import { ObjectId } from "mongoose"

export type SlotDTO={
    _id:ObjectId,
    start:number,
    end:number,
    enabled:boolean
}

export type WeekSlotsRequestDTO={
    Monday:Omit<SlotDTO,'_id'>[],
    Tuesday:Omit<SlotDTO,'_id'>[],
    Wednesday:Omit<SlotDTO,'_id'>[],
    Thursday:Omit<SlotDTO,'_id'>[],
    Friday:Omit<SlotDTO,'_id'>[],
    Saturday:Omit<SlotDTO,'_id'>[]
    Sunday:Omit<SlotDTO,'_id'>[]
}

export type WeekSlotsResponseDTO={
    Monday:SlotDTO[],
    Tuesday:SlotDTO[],
    Wednesday:SlotDTO[],
    Thursday:SlotDTO[],
    Friday:SlotDTO[],
    Saturday:SlotDTO[]
    Sunday:SlotDTO[]
}


export type DomainSlotsResponseDTO={
    weekSlots:WeekSlotsResponseDTO,
    mentor:{
        _id:ObjectId,
        name:string,
        profileImage:string,
        country:string|null,
        about:string,
        skills:string[],
        workedAt:string[],
        fee:number
    }
}
