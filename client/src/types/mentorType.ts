import type { GENDER } from "@/utils/constants"
import type { DomainType } from "./domainTypes"

export type MentorRegistrationFormDataType={
    domains:string[]
    about:string,
    workedAt:string[],
    skills:string[]
    cv:string
    experienceCirtificate:string,
    fee:number
}

export type MentorRegistrationErrorType={
    selectedDomainsError?:string,
    descriptionError?:string,
    workedAtError?:string,
    skillsError?:string,
    images?:string;
    
}

export type MentorDataType={
    _id: string,
    userId:string,
    about: string,
    email:string,
    domains:Pick<DomainType,'_id'|'name'>[],
    isBlocked: boolean,
    cv:string,
    experienceCirtificate:string,
    skills: string[],
    workedAt:string[],
    name: string,
    country: string|null,
    gender: GENDER|null,
    mobileNumber: string|null,
    profileImage:string|null,
    fee:number
}


export type GetAllMentorResponseType={
   mentors:Omit<MentorDataType,"cv"|"experienceCirtificate">[],
   totalPages:number
}