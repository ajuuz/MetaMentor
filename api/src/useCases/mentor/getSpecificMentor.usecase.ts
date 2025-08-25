import { plainToInstance } from "class-transformer";
import { IMentorRepository } from "entities/repositoryInterfaces/mentorRepository.interface";
import { IGetSpecificMentorUsecase } from "entities/usecaseInterfaces/mentor/getSpecificMentorUsecase.interface";
import { MentorDataDTO } from "shared/dto/mentorDTO";
import { GetMentorForAdminResDTO } from "shared/dto/response/mentor.dto";
import { NotFoundError } from "shared/utils/error/notFounError";
import { ValidationError } from "shared/utils/error/validationError";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetSpecificMentorUsecase implements IGetSpecificMentorUsecase{
    constructor(
        @inject('IMentorRepository')
        private _mentorRepository:IMentorRepository
    ){}
    async execute(mentorId: string): Promise<GetMentorForAdminResDTO> {
        if(!mentorId) throw new ValidationError('user id is needed');

        const data = await this._mentorRepository.findById(mentorId)
        if(!data) throw new NotFoundError('No application found');
        const mentor = plainToInstance(GetMentorForAdminResDTO,data,{
            excludeExtraneousValues:true
        })
        return mentor
    }
}