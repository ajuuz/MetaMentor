import { IGetMentorForAdmin, IGetMentorsForAdmin, IMentorEntity } from "entities/modelEntities/mentor-model.entity";
import { IMentorRepository } from "entities/repositoryInterfaces/mentorRepository.interface";
import { mentorModel } from "frameworks/database/models/mentor.model";
import { Types } from "mongoose";
import {  MentorFindFilterDTO, MentorUpdateDTO } from "shared/dto/mentorDTO";
import { injectable } from "tsyringe";

@injectable()
export class MentorRepository implements IMentorRepository{

    async findById(mentorId:string):Promise<IGetMentorForAdmin|null>{
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
                about:1,
                cv:1,
                experienceCirtificate:1,
                skills:1,
                workedAt:1,
                fee:1,
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
        return mentor?.[0]?mentor[0]:null
    }

    async register(userId:string,mentorDetails:Partial<IMentorEntity>):Promise<void>{
        const newMentor = new mentorModel({userId,...mentorDetails})
        await newMentor.save()
    }

    async find(filter:Partial<MentorFindFilterDTO>, skip: number, limit: number):Promise<{data:IGetMentorsForAdmin[],totalDocuments:number}>{
        const [data,totalDocuments] = await Promise.all([
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
                {$lookup:{
                    from:'domains',
                    localField:'domains',
                    foreignField:'_id',
                    as:'domains'
                }},
                {$project:{
                    _id:0,
                    name:'$user.name',
                    country:'$user.country',
                    mobileNumber:'$user.mobileNumber',
                    userId:1,
                    domains:{
                        $map:{
                            input:'$domains',
                            as:'d',
                            in:'$$d.name'
                        }
                    },
                    skills:1,
                    workedAt:1,
                    fee:1,
                    isBlocked:1,
                }}
            ]),
            mentorModel.countDocuments(filter)
        ])
            return {data,totalDocuments}
    }

    async updateOne(filter:Partial<MentorUpdateDTO.filter>,update:Partial<MentorUpdateDTO.update>):Promise<void>{
        await mentorModel.updateOne(filter,update)
    }

    async getStatus(userId:string):Promise<IMentorEntity|null>{
        const user=await mentorModel.findOne({userId}).lean<IMentorEntity>()
        return user;
    }
}