import { IMentorRepository } from "entities/repositoryInterfaces/mentorRepository.interface";
import { IRejectMentorApplicationUsecase } from "entities/usecaseInterfaces/mentor/rejectMentorApplication.interface";
import { EVENT_EMITTER_TYPE, MAIL_CONTENT_PURPOSE } from "shared/constants";
import { MentorUpdateDTO } from "shared/dto/mentorDTO";
import { eventBus } from "shared/eventBus";
import { mailContentProvider } from "shared/mailContentProvider";
import { inject, injectable } from "tsyringe";


@injectable()
export class RejectMentorApplicationUsecase implements IRejectMentorApplicationUsecase{

    constructor(
        @inject('IMentorRepository')
        private _mentorRepository:IMentorRepository,

    ){}
    async execute(mentorId:string,email:string,reason:string):Promise<void>{

        const filter:Pick<MentorUpdateDTO.filter,"userId">={userId:mentorId}
        const update:Pick<MentorUpdateDTO.update,"isRejected">={isRejected:true}

        await this._mentorRepository.updateOne(filter,update)

        const html = mailContentProvider(MAIL_CONTENT_PURPOSE.MENTOR_REJECTION,reason)
        
        eventBus.emit(EVENT_EMITTER_TYPE.SENDMAIL,email,"Application Rejected",html)
    }
}