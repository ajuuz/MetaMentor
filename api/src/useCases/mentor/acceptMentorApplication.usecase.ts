import { IMentorRepository } from "entities/repositoryInterfaces/mentorRepository.interface";
import { ISlotRepository } from "entities/repositoryInterfaces/slotRepository.interface";
import { IUserRespository } from "entities/repositoryInterfaces/user-repository.interface";

import { IAcceptMentorApplicationUsecase } from "entities/usecaseInterfaces/mentor/acceptMentorApplicationUsecase.interface";

import { EVENT_EMITTER_TYPE, MAIL_CONTENT_PURPOSE, ROLES } from "shared/constants";
import { eventBus } from "shared/eventBus";
import { mailContentProvider } from "shared/mailContentProvider";
import { ValidationError } from "shared/utils/error/validationError";

import { inject, injectable } from "tsyringe";

@injectable()
export class AcceptMentorApplicationUsecase implements IAcceptMentorApplicationUsecase{
    constructor(
        @inject('IMentorRepository')
        private _mentorRepository:IMentorRepository,

        @inject('IUserRepository')
        private _userRepository:IUserRespository,

        @inject('ISlotRepository')
        private _slotRepository:ISlotRepository,
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

        asyncOperations.push(this._slotRepository.createSlots(mentorId))

        await Promise.all(asyncOperations)

        const html = mailContentProvider(MAIL_CONTENT_PURPOSE.MENTOR_ACCEPTANCE)
        eventBus.emit(EVENT_EMITTER_TYPE.SENDMAIL,email,"Accepted Application",html)
    }
}