import { IMentorRepository } from "entities/repositoryInterfaces/mentorRepository.interface";
import { IEmailService } from "entities/serviceInterfaces/email-service.interface";
import { IRejectMentorApplicationUsecase } from "entities/usecaseInterfaces/mentor/rejectMentorApplication.interface";
import { MentorUpdateDTO } from "shared/dto/mentorDTO";
import { inject, injectable } from "tsyringe";


@injectable()
export class RejectMentorApplicationUsecase implements IRejectMentorApplicationUsecase{

    constructor(
        @inject('IMentorRepository')
        private _mentorRepository:IMentorRepository,

         @inject("IEmailService")
        private _emailService: IEmailService
    ){}
    async execute(mentorId:string,email:string,reason:string):Promise<void>{

        const asyncOperations=[];
        const filter:Pick<MentorUpdateDTO.filter,"userId">={userId:mentorId}
        const update:Pick<MentorUpdateDTO.update,"isRejected">={isRejected:true}
        asyncOperations.push(this._mentorRepository.updateOne(filter,update))

        const html=`
                     <div style="max-width: 500px; margin: auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; border: 1px solid #e0e0e0; border-radius: 10px; padding: 30px; background-color: #fff9f9; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
                      <h2 style="text-align: center; color: #d32f2f;">❌ Application Update</h2>
                      <p style="font-size: 16px; color: #555;">Dear Applicant,</p>
                      <p style="font-size: 16px; color: #555;">
                        Thank you for your interest in becoming a mentor with <strong>Meta Mentor</strong>. After carefully reviewing your application, we regret to inform you that it has not been approved at this time.
                      </p>
                      <p style="font-size: 16px; color: #555;">
                        Please know that this decision was not easy. While we truly value your effort and enthusiasm, we believe that there may be other ways for you to grow and engage with our community in the future.
                      </p>
                      <div style="text-align: center; margin: 30px 0;">
                        <span style="display: inline-block; font-size: 16px; background-color: #fef3c7; color: #92400e; padding: 10px 20px; border-radius: 6px;">
                          We encourage you to apply again after gaining more experience or refining your profile.<br/>
                          Reason : ${reason}
                        </span>
                      </div>
                      <p style="font-size: 14px; color: #666;">
                        We sincerely appreciate your interest and wish you continued success in all your endeavors.
                      </p>
                      <p style="font-size: 14px; color: #aaa; text-align: center; margin-top: 40px;">— The Meta Mentor Team</p>
                     </div>
                    `
        asyncOperations.push(this._emailService.sendMail(email,"Application Rejected",html))
        await Promise.all(asyncOperations)
    }
}