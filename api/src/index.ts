import "reflect-metadata";
import { MongoConnect } from "infrastructure/config/database/mongoConnect.config.js";
import { App } from "infrastructure/config/server/server.config.js";
import { RedisClient } from "infrastructure/config/redis/redisClient.config";
import { config } from "shared/config.js";
const app = new App();
const mongoConnect = new MongoConnect();

mongoConnect
  .connectDB()
  .then(() => console.log("mongodb connected"))
  .catch((error) => console.error(error));

RedisClient.connectRedis()
  .then(() => console.log("redis connected"))
  .catch((error) => console.log(error));

app
  .getApp()
  .listen(config.server.PORT, () =>
    console.log(`server running at port ${config.server.PORT}`)
  );
