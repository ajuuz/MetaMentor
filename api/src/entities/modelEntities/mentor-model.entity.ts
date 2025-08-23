export interface IMentorEntity{
    userId:string,
    about:string,
    domains:string[],
    isBlocked:boolean,
    cv:string,
    experienceCirtificate:string,
    rating:{
        totalStars:number,
        noOfRaters:number,
    },
    skills:string[],
    workedAt:string[],
    isVerified:boolean,
    isRejected:boolean,
    fee:number
}