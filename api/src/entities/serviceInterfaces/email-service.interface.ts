

export interface IEmailService{

    sendMail(to:string,subject:string,otp:string):Promise<void>
}