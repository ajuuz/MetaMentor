import { IEmailService } from 'entities/serviceInterfaces/email-service.interface';
import nodemailer from 'nodemailer';
import { config } from 'shared/config';
import { injectable } from 'tsyringe';


@injectable()
export class EmailService implements IEmailService{

    private transporter;
    constructor(){
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.email.EMAIL, 
                pass: config.email.PASSWORD
            }
        })
    }

    async sendMail(to:string,subject:string,otp:string):Promise<void>{

        const mailOptions = {
            from :"Meta Mentor",
            to,
            subject,
            text: `Your OTP code for signup is: ${otp}`
        }

        await this.transporter.sendMail(mailOptions);
    }

}