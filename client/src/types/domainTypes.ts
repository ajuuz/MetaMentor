import type { AddLevel, LevelType } from "./levelTypes"
import type { StudentReviewCard } from "./reviewTypes"

export type DomainEntity={
    _id:string,
    name:string,
    motive:string,
    description:string,
    image:string,
    isBlocked:boolean,
}

export type DomainWithLevel= DomainEntity & {levels:LevelType[]}

export type DomainCreationType= Omit<DomainEntity,'_id'|'isBlocked'> & {
    levels:AddLevel[]
}

export type GetAllDomains={
   domains:DomainEntity[],
   totalPages:number
}



//enrolled domainType
export type EnrolledDomain={
    reviews:StudentReviewCard[]
    domain:Omit<DomainEntity,'isBlocked'>
    noOfLevelPassed:number
    nextLevels:LevelType[]
}

