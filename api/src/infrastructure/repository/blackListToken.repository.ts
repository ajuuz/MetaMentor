import { IBlackListTokenRepository } from "domain/repositoryInterfaces/blackListTokenRepository.interface";
import { RedisClient } from "infrastructure/config/redis/redisClient.config";
import { injectable } from "tsyringe";

@injectable()
export class BlackListTokenRepository implements IBlackListTokenRepository {
  async blacklistToken(
    fieldName: string,
    expiry: number,
    token: string
  ): Promise<void> {
    const redisClient = await RedisClient.getClient();
    await redisClient.setEx(fieldName, expiry, token);
  }

  async getToken(fieldName: string): Promise<string | null> {
    const redisClient = await RedisClient.getClient();
    return await redisClient.get(fieldName);
  }

  async removeToken(fieldName: string): Promise<void> {
    const redisClient = await RedisClient.getClient();
    await redisClient.del(fieldName);
  }
}
