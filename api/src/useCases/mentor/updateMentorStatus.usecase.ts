import { IMentorRepository } from "entities/repositoryInterfaces/mentorRepository.interface";
import { IUserRespository } from "entities/repositoryInterfaces/user-repository.interface";
import { IUpdateMentorStatusUsecase } from "entities/usecaseInterfaces/mentor/updateMentorStatusUsecase.interface";
import { MentorUpdateDTO } from "shared/dto/mentorDTO";
import { ValidationError } from "shared/utils/error/validationError";
import { inject, injectable } from "tsyringe";


@injectable()
export class UpdateMentorStatusUsecase implements IUpdateMentorStatusUsecase{
    
    constructor(
        @inject('IMentorRepository')
        private _mentorRepository:IMentorRepository,

        @inject('IUserRepository')
        private _userRepository:IUserRespository
    ){}

    async execute(mentorId:string,status:boolean):Promise<void>{
        if(!mentorId || ![true,false].includes(status)) throw new ValidationError("insufficient data for updating status");

        const filter:MentorUpdateDTO.filter={userId:mentorId};
        const update:Pick<MentorUpdateDTO.update,"isBlocked">={isBlocked:status}
        const asyncOperations=[]
        asyncOperations.push(this._userRepository.updateOne({_id:mentorId},update))
        asyncOperations.push(this._mentorRepository.updateOne(filter,update))
        await Promise.all(asyncOperations)
    }
}