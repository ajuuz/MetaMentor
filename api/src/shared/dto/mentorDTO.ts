import { ObjectId } from "mongoose"
import { GENDER } from "shared/constants"

export type MentorRegisterRequestDTO = {
    selectedDomains:string[]
    description:string,
    workedAt:string[],
    skills:string[]
    cvImage:any
    verificationImage:any
}

export type MentorDataDTO={
    _id: ObjectId,
    userId:ObjectId,
    about: string,
    domains:string[],
    isBlocked: boolean,
    cv:string,
    experienceCirficate:string,
    skills: string[],
    workedAt:string[],
    name: string,
    country: string|null,
    gender: GENDER|null,
    mobileNumber: number|null
    profileImage:string|null
}

export type GetAllMentorResponseDTO={
   mentors:MentorDataDTO[],
   totalDocuments:number,
   totalPages:number
}


export namespace MentorUpdateDTO{
    export type filter={
        userId:string
    }
    export type update={
        about:string,
        domains:string[]
        isBlocked:boolean
        cv:string,
        skills:string[]
        workedAt:string[]
        isVerified:boolean
        isRejected:boolean
    }
}


export type MentorFindFilterDTO={
    userId:string|ObjectId,
    isBlocked:boolean,
    skills:string[],
    workedAt:string[],
    isVerified:boolean,
    isRejected:boolean
}