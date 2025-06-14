import { IMentorRepository } from "entities/repositoryInterfaces/mentorRepository.interface";
import { IUserRespository } from "entities/repositoryInterfaces/user-repository.interface";
import { IEmailService } from "entities/serviceInterfaces/email-service.interface";
import { IAcceptMentorApplicationUsecase } from "entities/usecaseInterfaces/mentor/acceptMentorApplicationUsecase.interface";
import { EVENT_EMITTER_TYPE, ROLES } from "shared/constants";
import { eventBus } from "shared/eventBus";
import { ValidationError } from "shared/utils/error/validationError";
import { inject, injectable } from "tsyringe";

@injectable()
export class AcceptMentorApplicationUsecase implements IAcceptMentorApplicationUsecase{
    constructor(
        @inject('IMentorRepository')
        private _mentorRepository:IMentorRepository,

        @inject('IUserRepository')
        private _userRepository:IUserRespository,

         @inject("IEmailService")
        private _emailService: IEmailService
    ){}

    async execute(mentorId: string,email:string): Promise<void> {
        if(!mentorId) throw new ValidationError("mentor Id is required");
        
        const asyncOperations=[]
        const userFilter={_id:mentorId}
        const userUpdate={role:ROLES.MENTOR}
        
        asyncOperations.push(this._userRepository.updateOne(userFilter,userUpdate))
        
        const mentorFilter={userId:mentorId};
        const mentorUpdate={isVerified:true}

        asyncOperations.push(this._mentorRepository.updateOne(mentorFilter,mentorUpdate))

        await Promise.all(asyncOperations)

        const html = `<div style="max-width: 500px; margin: auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; border: 1px solid #e0e0e0; border-radius: 10px; padding: 30px; background-color: #f9f9f9; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
                         <h2 style="text-align: center; color: #333;">🎉 Welcome Aboard, Mentor!</h2>
                         <p style="font-size: 16px; color: #555;">Dear Mentor,</p>
                         <p style="font-size: 16px; color: #555;">
                           Congratulations! Your application to become a mentor on <strong>Meta Mentor</strong> has been officially accepted.
                         </p>
                         <p style="font-size: 16px; color: #555;">
                           We are thrilled to have someone of your caliber join our community of educators and changemakers. Your knowledge, experience, and dedication will surely inspire many.
                         </p>
                         <div style="text-align: center; margin: 30px 0;">
                           <span style="display: inline-block; font-size: 18px; background-color: #16a34a; color: white; padding: 12px 20px; border-radius: 8px; font-weight: bold;">
                             You're officially a Meta Mentor! 🌟
                           </span>
                         </div>
                         <p style="font-size: 14px; color: #666;">
                           Your profile is now active, and students can soon start connecting with you. Get ready to make a difference!
                         </p>
                         <p style="font-size: 14px; color: #aaa; text-align: center; margin-top: 40px;">— The Meta Mentor Team</p>
                    </div>`
        

        eventBus.emit(EVENT_EMITTER_TYPE.SENDMAIL,email,"Accepted Application",html)
    }
}