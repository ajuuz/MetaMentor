import { IOtpEntity } from "entities/modelEntities/otp-model.entity";
import { IOtpRespository } from "entities/repositoryInterfaces/auth/otp-repository.interface";
import { otpDB } from "frameworks/database/models/otp.model";
import { RedisClient } from "frameworks/redis/redisClient";
import { injectable } from "tsyringe";

@injectable()
export class OtpRepository implements IOtpRespository {

    public async saveOtp(email: string, otp: string): Promise<void> {
        const redisClient =await RedisClient.connectRedis()
        await redisClient.setEx(`${email}`,300,otp)
    }
    
    public async getOtp(email: string):Promise<string|null>{
        const redisClient =await RedisClient.connectRedis()
        const otp = await redisClient.get(email);
        return otp;
    }
    
    public async deleteOtp(email: string): Promise<void> {
        const redisClient=await RedisClient.connectRedis()
        await redisClient.del(email)
    }
}