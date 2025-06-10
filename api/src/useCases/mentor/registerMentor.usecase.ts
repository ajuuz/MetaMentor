import { IMentorRepository } from "entities/repositoryInterfaces/mentorRepository.interface";
import { IRegisterMentorUsecase } from "entities/usecaseInterfaces/mentor/registerMentorUsecase.interface";
import { ObjectId } from "mongoose";
import { HTTP_STATUS } from "shared/constants";
import { MentorRegisterRequestDTO } from "shared/dto/mentorDTO";
import { CustomError } from "shared/utils/error/customError";
import { inject, injectable } from "tsyringe";

@injectable()
export class RegisterMentorUsecase implements IRegisterMentorUsecase{
    constructor(
        @inject('IMentorRepository')
        private _mentorRepository:IMentorRepository
    ){}

   async execute(userId:string,mentorDetails:MentorRegisterRequestDTO):Promise<void>{
        const isMentorExists = await this._mentorRepository.findById(userId);
        if(isMentorExists){
            throw new CustomError(HTTP_STATUS.CONFLICT,"mentor already exists");
        }

        await this._mentorRepository.register(userId,mentorDetails);
        
    }
}