import { ISlotEntity } from "entities/modelEntities/slotModel.entity";



export interface IGetMentorSlotsUsecase{
    execute(mentorId:string):Promise<Pick<ISlotEntity,'weekSlots'>>
}