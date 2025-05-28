import { createClient } from "redis";
import { config } from "shared/config";


export class RedisClient{

    static async connectRedis(){
        const redisClient= createClient({
            url:config.redis.URL
        })
        redisClient.on('error',(err)=>console.error('Redis Client error',err));
        await redisClient.connect()

        return redisClient;
    }

}