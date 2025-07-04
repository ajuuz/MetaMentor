import type { GENDER } from "@/utils/constants"

export type MentorRegistrationFormDataType={
    domains:string[]
    about:string,
    workedAt:string[],
    skills:string[]
    cv:string
    experienceCirtificate:string
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
    domains:string[],
    isBlocked: boolean,
    cv:string,
    experienceCirtificate:string,
    skills: string[],
    workedAt:string[],
    name: string,
    country: string|null,
    gender: GENDER|null,
    mobileNumber: string|null,
    profileImage:string|null
}


export type GetAllMentorResponseType={
   mentors:Omit<MentorDataType,"cv"|"experienceCirtificate">[],
   totalPages:number
}