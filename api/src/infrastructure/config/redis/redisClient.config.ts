import { createClient, RedisClientType } from "redis";
import { config } from "shared/config";

export class RedisClient {
  private static client: RedisClientType | null = null;

  static async connectRedis(): Promise<void> {
    RedisClient.client = createClient({
      url: config.redis.URL,
    });

    RedisClient.client.on("error", (err) => {
      console.error("Redis Client Error", err);
    });
    await RedisClient.client.connect();
  }

  static async getClient(): Promise<RedisClientType> {
    if (!RedisClient.client) {
      await RedisClient.connectRedis();
    }
    return RedisClient.client!;
  }

  // static async connectRedis(){
  //     const redisClient= createClient({
  //         url:config.redis.URL
  //     })
  //     redisClient.on('error',(err)=>console.error('Redis Client error',err));
  //     await redisClient.connect()

  //     return redisClient;
  // }
}
