import { IMentorEntity } from "entities/modelEntities/mentor-model.entity";
import { IMentorRepository } from "entities/repositoryInterfaces/mentorRepository.interface";
import { mentorModel } from "frameworks/database/models/mentor.model";
import { Types } from "mongoose";
import { GetAllMentorResponseDTO, MentorDataDTO, MentorFindFilterDTO, MentorRegisterRequestDTO, MentorUpdateDTO } from "shared/dto/mentorDTO";
import { injectable } from "tsyringe";

@injectable()
export class MentorRepository implements IMentorRepository{

    async findById(mentorId:string):Promise<MentorDataDTO|undefined>{
        const mentorObjectId = new Types.ObjectId(mentorId);
        const mentor = await mentorModel.aggregate([
            {$match:{userId:mentorObjectId}},
            {$lookup:{
                from:'users',
                localField:'userId',
                foreignField:'_id',
                as:'userDetails'
            }},
            {$lookup:{
                from:'domains',
                localField:'domains',
                foreignField:'_id',
                as:'domains'
            }},
            {$unwind:'$userDetails'},
            {$project:{
                userId:1,
                about:1,
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
                profileImage:'$userDetails.profileImage',
                domains:{
                    $map:{
                        input:'$domains',
                        as:'domain',
                        in:{
                            _id:'$$domain._id',
                            name:'$$domain.name'
                        }
                    }
                }
            }}
        ]);
        return mentor[0]
    }

    async register(userId:string,mentorDetails:MentorRegisterRequestDTO):Promise<void>{
        const newMentor = new mentorModel({userId,...mentorDetails})
        await newMentor.save()
    }

    async find(filter:Partial<MentorFindFilterDTO>, skip: number, limit: number):Promise<Omit<Omit<GetAllMentorResponseDTO,"cv"|"experienceCirtificate">,'totalPages'>>{
        const [mentors,totalDocuments] = await Promise.all([
            mentorModel.aggregate([
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
            mentorModel.countDocuments(filter)
        ])
            return {mentors,totalDocuments}
    }

    async updateOne(filter:Partial<MentorUpdateDTO.filter>,update:Partial<MentorUpdateDTO.update>):Promise<void>{
        await mentorModel.updateOne(filter,update)
    }

    async getStatus(userId:string):Promise<IMentorEntity|null>{
        const user=await mentorModel.findOne({userId})
        return user;
    }
}