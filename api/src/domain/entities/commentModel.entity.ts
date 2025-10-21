
export interface ICommentEntity{
    _id:string,
    postId:string,
    parentCommentId:string|null,
    text:string,
    commenterId:string,
    commentedAt:Date,
    isBlocked:boolean
}