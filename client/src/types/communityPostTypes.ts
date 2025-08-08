export type CommunityPostEntity={
    _id:string,
    communityId:string,
    studentId:string,
    title:string,
    image?:string,
    description:string,
    postedAt:Date,
    isBlocked:boolean
}

export type CreateCommunityPostDTO=Omit<CommunityPostEntity,'_id'|'studentId'|'postedAt'|'isBlocked'>