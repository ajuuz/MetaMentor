import { ISlotEntity } from "entities/modelEntities/slotModel.entity";
import { BaseRepository } from "./base.repository";
import { ISlotModel, slotModel } from "frameworks/database/models/slot.model";
import { DomainSlotsResponseDTO, WeekSlotsDTO } from "shared/dto/slotDTO";
import { ISlotRepository } from "entities/repositoryInterfaces/slotRepository.interface";
import mongoose from "mongoose";


export class SlotRepository extends BaseRepository<ISlotEntity,ISlotModel> implements ISlotRepository{

    constructor(){
        super(slotModel)
    }
    
    async updateSlot(mentorId:string,weekSlots:WeekSlotsDTO):Promise<void>{
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
                    mentor:{
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
}