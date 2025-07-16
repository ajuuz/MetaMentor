import { ISlotLockRepository } from "entities/repositoryInterfaces/slotLockRepository.interface";
import { RedisClient } from "frameworks/redis/redisClient";
import { injectable } from "tsyringe";



@injectable()
export class SlotLockRepository implements ISlotLockRepository{

    async lockSlot(slotId:string):Promise<void>{
        const key = `slotId:${slotId}`
        const redisClient = await RedisClient.getClient();
        await redisClient.setEx(key,300,'locked');
    }

    async isSlotLocked(slotId:string):Promise<boolean>{
        const key=`slotId:${slotId}`
        const redisClient = await RedisClient.getClient();
        const value=await redisClient.get(key);
        return value==='locked'
    }

    async unlockSlot(slotId:string):Promise<void>{
        const key=`slotId:${slotId}`
        const redisClient = await RedisClient.getClient();
        await redisClient.del(key)
    }
}