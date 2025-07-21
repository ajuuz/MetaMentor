import { ISlotEntity, IWeekEntity } from "entities/modelEntities/slotModel.entity";



export interface IGetMentorSlotsUsecase{
    execute(mentorId:string):Promise<IWeekEntity>
}