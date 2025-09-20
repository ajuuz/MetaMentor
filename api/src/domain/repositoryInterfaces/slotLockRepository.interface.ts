


export interface ISlotLockRepository{
    lockSlot(slotId:string[]):Promise<void>
    isSlotLocked(slotId:string[]):Promise<string>
    unlockSlot(slotId:string):Promise<void>
}