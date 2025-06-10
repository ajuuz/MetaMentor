import { IMentorRepository } from "entities/repositoryInterfaces/mentorRepository.interface";
import { IGetSpecificMentorUsecase } from "entities/usecaseInterfaces/mentor/getSpecificMentorUsecase.interface";
import { MentorDataDTO } from "shared/dto/mentorDTO";
import { NotFoundError } from "shared/utils/error/notFounError";
import { ValidationError } from "shared/utils/error/validationError";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetSpecificMentorUsecase implements IGetSpecificMentorUsecase{
    constructor(
        @inject('IMentorRepository')
        private _mentorRepository:IMentorRepository
    ){}
    async execute(mentorId: string): Promise<MentorDataDTO> {
        if(!mentorId) throw new ValidationError('user id is needed');

        const mentor : MentorDataDTO|undefined = await this._mentorRepository.findById(mentorId)
        
        if(!mentor) throw new NotFoundError('No application found');
        
        return mentor
    }
}