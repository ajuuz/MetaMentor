import { ISlotLockRepository } from "entities/repositoryInterfaces/slotLockRepository.interface";
import { RedisClient } from "frameworks/redis/redisClient";
import { injectable } from "tsyringe";

@injectable()
export class SlotLockRepository implements ISlotLockRepository {
  async lockSlot(slotId: string[]): Promise<void> {
    for (let i = 0; i < slotId.length; i++) {
      const key = `slotId:${slotId[i]}`;
      const redisClient = await RedisClient.getClient();
      await redisClient.setEx(key, 300, "locked");
    }
  }

  async isSlotLocked(slotId: string[]): Promise<string> {
    let whichSlot: string = "";
    for (let i = 0; i < slotId.length; i++) {
      const key = `slotId:${slotId[i]}`;
      const redisClient = await RedisClient.getClient();
      const value = await redisClient.get(key);
      if(value === "locked"){
        if(i===0) whichSlot='first';
        else{
            if(whichSlot==='first') whichSlot='both'
            else whichSlot ='second'
        }
      }
    }
    return whichSlot
  }

  async unlockSlot(slotId: string): Promise<void> {
    const key = `slotId:${slotId}`;
    const redisClient = await RedisClient.getClient();
    await redisClient.del(key);
  }
}
