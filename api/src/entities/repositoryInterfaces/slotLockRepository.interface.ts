


export interface ISlotLockRepository{
    lockSlot(slotId:string):Promise<void>
    isSlotLocked(slotId:string):Promise<boolean>
    unlockSlot(slotId:string):Promise<void>
}