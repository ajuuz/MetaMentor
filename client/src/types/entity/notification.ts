export type NotificationEntity={
    _id:string
    userId:string
    type:string,
    title:string,
    body:string,
    navigate:string|null
    isRead:boolean,
    createdAt:Date,
    updatedAt:Date
}