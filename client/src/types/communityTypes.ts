
type CommunityType={
    communityId:string,
    name:string,
    image:string,
    isBlocked:boolean
}

export type GetAllCommunity={
   communities:CommunityType[],
   totalPages:number
}