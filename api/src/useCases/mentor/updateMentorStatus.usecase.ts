import { IMentorRepository } from "entities/repositoryInterfaces/mentorRepository.interface";
import { IUpdateMentorStatusUsecase } from "entities/usecaseInterfaces/mentor/updateMentorStatusUsecase.interface";
import { MentorUpdateDTO } from "shared/dto/mentorDTO";
import { ValidationError } from "shared/utils/error/validationError";
import { inject, injectable } from "tsyringe";


@injectable()
export class UpdateMentorStatusUsecase implements IUpdateMentorStatusUsecase{
    
    constructor(
        @inject('IMentorRepository')
        private _mentorRepository:IMentorRepository
    ){}

    async execute(mentorId:string,status:boolean):Promise<void>{
        if(!mentorId || ![true,false].includes(status)) throw new ValidationError("insufficient data for updating status");

        const filter:MentorUpdateDTO.filter={userId:mentorId};
        const update:Pick<MentorUpdateDTO.update,"isBlocked">={isBlocked:status}
        await this._mentorRepository.updateOne(filter,update)
    }
}