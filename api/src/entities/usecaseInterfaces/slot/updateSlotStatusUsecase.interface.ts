


export interface IUpdateSlotStatusUsecase{
    execute(mentorId:string,day:string,slotId:string,slotStatus:boolean):Promise<void>
}