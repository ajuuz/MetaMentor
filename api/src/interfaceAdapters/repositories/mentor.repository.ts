import { IMentorEntity } from "entities/modelEntities/mentor-model.entity";
import { IMentorRepository } from "entities/repositoryInterfaces/mentorRepository.interface";
import { mentorDB } from "frameworks/database/models/mentor.model";
import { Types } from "mongoose";
import { GetAllMentorResponseDTO, MentorDataDTO, MentorReadFilterDTO, MentorRegisterRequestDTO, MentorUpdateDTO } from "shared/dto/mentorDTO";
import { injectable } from "tsyringe";

@injectable()
export class MentorRepository implements IMentorRepository{


    async findById(mentorId:string):Promise<MentorDataDTO|undefined>{
        const mentorObjectId = new Types.ObjectId(mentorId);
        const mentor = await mentorDB.aggregate([
            {$match:{userId:mentorObjectId}},
            {$lookup:{
                from:'users',
                localField:'userId',
                foreignField:'_id',
                as:'userDetails'
            }},
            {$unwind:'$userDetails'},
            {$project:{
                userId:1,
                about:1,
                domains:1,
                isBlocked:1,
                cv:1,
                experienceCirtificate:1,
                skills:1,
                workedAt:1,
                name:'$userDetails.name',
                country:"$userDetails.country",
                gender:"$userDetails.gender",
                mobileNumber:'$userDetails.mobileNumber',
                email:'$userDetails.email',
            }}
        ]);
        return mentor[0]
    }

    async register(userId:string,mentorDetails:MentorRegisterRequestDTO):Promise<void>{
        const newMentor = new mentorDB({userId,...mentorDetails})
        await newMentor.save()
    }

    async find(filter:Partial<MentorReadFilterDTO>, skip: number, limit: number):Promise<Omit<Omit<GetAllMentorResponseDTO,"cv"|"experienceCirtificate">,'totalPages'>>{
        const [mentors,totalDocuments] = await Promise.all([
            mentorDB.aggregate([
                {$match:filter},
                {$sort:{createdAt:-1}},
                {$skip:skip},
                {$limit:limit},
                {$lookup:{
                    from:'users',
                    localField:'userId',
                    foreignField:'_id',
                    as:'user'
                }},
                {$unwind:'$user'},
                {$project:{
                    name:'$user.name',
                    country:'$user.country',
                    gender:'$user.gender',
                    mobileNumber:'$user.mobileNumber',
                    userId:1,
                    about:1,
                    isBlocked:1,
                    domains:1,
                    skills:1,
                    workedAt:1
                }}
            ]),
            mentorDB.countDocuments(filter)
        ])
            return {mentors,totalDocuments}
    }

    async updateOne(filter:Partial<MentorUpdateDTO.filter>,update:Partial<MentorUpdateDTO.update>):Promise<void>{
        await mentorDB.updateOne(filter,update)
    }

    async getStatus(userId:string):Promise<IMentorEntity|null>{
        const user=await mentorDB.findOne({userId})
        return user;
    }
}