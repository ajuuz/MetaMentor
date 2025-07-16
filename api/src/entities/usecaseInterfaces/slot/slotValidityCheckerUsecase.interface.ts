


export interface ISlotValidityCheckerUsecase{
    execute(mentorId:string,day:string,slotId:string):Promise<void>
}