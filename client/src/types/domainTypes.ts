import type { LevelType } from "./levelTypes"
import type { ReviewEntity, StudentReviewCard } from "./reviewTypes"

export type DomainEntity={
    _id:string,
    name:string,
    motive:string,
    description:string,
    image:string,
    isBlocked:boolean,
}

export type DomainWithLevel= DomainEntity & {levels:LevelType[]}

export type DomainCreationType={
    name:string,
    description:string,
    motive:string,
    image:string,
    levels:{name:string,description:string,taskFile:string}[]
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

