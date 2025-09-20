


export interface IPushNotificationService{
    sendNotification(userId:string,title:string,body:string):Promise<void>
}