import { RedisOptions } from "ioredis";

export const bullRedisConfig: RedisOptions = {
  host:  process.env.BULL_REDIS_HOST,
  port:  Number(process.env.BULL_REDIS_PORT),
  password: process.env.BULL_REDIS_PASSWORD, 
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
};
