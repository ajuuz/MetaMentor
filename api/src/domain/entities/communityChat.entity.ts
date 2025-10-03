
export interface ICommunityChatEnitity{
    _id:string,
    communityId:string
    studentId:string
    content:string
    createdAt:Date
    updatedAt:Date
}

export interface IGetCommunityChat extends Omit<ICommunityChatEnitity,'studentId'>{
    studentName:string
}
