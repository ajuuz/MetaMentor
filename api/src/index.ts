import "reflect-metadata";
import http from "http";

import { MongoConnect } from "infrastructure/config/database/mongoConnect.config.js";
import { App } from "infrastructure/config/server/server.config.js";
import "./infrastructure/workers/payment.worker";
import "./infrastructure/workers/reminder.worker";
import { RedisClient } from "infrastructure/config/redis/redisClient.config";
import { SocketConfig } from "infrastructure/config/socket/socket.config";
import { config } from "shared/config.js";


const app = new App().getApp();
const server = http.createServer(app);
SocketConfig.init(server);

const mongoConnect = new MongoConnect();

mongoConnect
  .connectDB()
  .then(() => console.log("mongodb connected"))
  .catch((error) => console.error("error consoled from index catch", error));

RedisClient.connectRedis()
  .then(() => console.log("redis connected"))
  .catch((error) => console.log(error));

server.listen(Number(config.server.PORT), () =>
  console.log(`server running at port ${config.server.PORT}`)
);
