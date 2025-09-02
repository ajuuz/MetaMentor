


export interface ISlotValidityCheckerUsecase{
    execute(mentorId:string,date:string,slotId:string):Promise<void>
}