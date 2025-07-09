

type CommunityType={
    _id:string,
    communityId:string,
    name:string,
    isBlocked:boolean
}

export type GetAllCommunityType={
   communities:CommunityType[],
   totalPages:number
}