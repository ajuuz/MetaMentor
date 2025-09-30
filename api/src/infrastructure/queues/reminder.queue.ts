import { Queue } from "bullmq";
import { bullRedisConfig } from "infrastructure/config/bullRedis/bullRedis.config";

export const reminderQueue = new Queue("reminderQueue", {
  connection: bullRedisConfig,
  defaultJobOptions: {
    removeOnComplete: true, // auto-remove completed jobs
    removeOnFail: 100, // keep last 100 failed jobs for debugging
  },
});
