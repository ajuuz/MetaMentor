import { ISlotEntity } from "entities/modelEntities/slotModel.entity";
import { BaseRepository } from "./base.repository";
import { ISlotModel, slotModel } from "frameworks/database/models/slot.model";
import { DomainSlotsResponseDTO, SlotDTO, WeekSlotsRequestDTO } from "shared/dto/slotDTO";
import { ISlotRepository } from "entities/repositoryInterfaces/slotRepository.interface";
import mongoose from "mongoose";


export class SlotRepository extends BaseRepository<ISlotEntity,ISlotModel> implements ISlotRepository{

    constructor(){
        super(slotModel)
    }
    
    async updateSlots(mentorId:string,weekSlots:WeekSlotsRequestDTO):Promise<void>{
        await this.model.updateOne({mentorId},{weekSlots})
    }

    async createSlots(mentorId:string):Promise<void>{
         const slot = new slotModel({mentorId})
         await slot.save()
    }

    async updateSlotStatus(mentorId:string,day:string,slotId:string,slotStatus:boolean):Promise<void>{
        await slotModel.updateOne({mentorId,[`weekSlots.${day}._id`]:slotId},{$set:{[`weekSlots.${day}.$.enabled`]:slotStatus}})
    }

    async getSlotsByDomains(domainId:string):Promise<DomainSlotsResponseDTO[]>{
        const slots:DomainSlotsResponseDTO[]= await slotModel.aggregate([
            {
                $lookup:{
                    from:'mentors',
                    localField:'mentorId',
                    foreignField:'userId',
                    as:'mentor'
                }
            },
            {
                $unwind:'$mentor'
            },
            {
                $match:{$and:[{'mentor.domains':new mongoose.Types.ObjectId(domainId)},{'mentor.isVerified':true},{'mentor.isBlocked':false}]}
            },
            {
                $lookup:{
                    from:'users',
                    localField:'mentor.userId',
                    foreignField:'_id',
                    as:'mentorDetails'
                }
            },
            { $unwind: "$mentorDetails" },
            {
                $project:{
                    weekSlots:1,
                    mentorId:1,
                    mentor:{
                        _id:'$mentor.userId',
                        fee:'$mentor.fee',
                        name:'$mentorDetails.name',
                        profileImage:'$mentorDetails.profileImage',
                        country:'$mentorDetails.country',
                        about:'$mentor.about',
                        skills:'$mentor.skills',
                        workedAt:'$mentor.workedAt'
                    }
                }
            }
        ])
        return slots
    }

    async getSpecificSlot(mentorId:string,day:string,slotId:string):Promise<SlotDTO|null>{
        const slotObjectId = new mongoose.Types.ObjectId(slotId);
        const slots = await slotModel.aggregate([
            {
                $match:{mentorId:new mongoose.Types.ObjectId(mentorId)}
            },
            {
                $project:{
                    slot:{
                        $filter:{
                            input:`$weekSlots.${day}`,
                            as:'slot',
                            cond:{$eq:["$$slot._id",slotObjectId]}
                        }
                    }
                }
            },
            {
                $unwind:'$slot'
            },
            {
                $project:{_id:0}
            }
        ])
        return slots[0]? slots[0].slot : null
    }
}