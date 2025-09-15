import { IOtpRespository } from "domain/repositoryInterfaces/otp-repository.interface";
import { RedisClient } from "frameworks/redis/redisClient";
import { injectable } from "tsyringe";

@injectable()
export class OtpRepository implements IOtpRespository {
  public async saveOtp(email: string, otp: string): Promise<void> {
    const redisClient = await RedisClient.getClient();
    await redisClient.setEx(`otp:${email}`, 60, otp);
  }

  public async getOtp(email: string): Promise<string | null> {
    const redisClient = await RedisClient.getClient();
    const otp = await redisClient.get(`otp:${email}`);
    return otp;
  }

  public async deleteOtp(email: string): Promise<void> {
    const redisClient = await RedisClient.getClient();
    await redisClient.del(`otp:${email}`);
  }
}
