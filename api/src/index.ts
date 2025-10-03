import "reflect-metadata";
import https from "https";
import { MongoConnect } from "infrastructure/config/database/mongoConnect.config.js";
import { App } from "infrastructure/config/server/server.config.js";
import "./infrastructure/workers/payment.worker";
import "./infrastructure/workers/reminder.worker";
import { RedisClient } from "infrastructure/config/redis/redisClient.config";
import { config } from "shared/config.js";
import { SocketConfig } from "infrastructure/config/socket/socket.config";
import fs from "fs";

const options = {
  key: fs.readFileSync("../certs/192.168.29.148-key.pem"),
  cert: fs.readFileSync("../certs/192.168.29.148.pem"),
};
const app = new App().getApp();
const server = https.createServer(options, app);
SocketConfig.init(server);

const mongoConnect = new MongoConnect();

mongoConnect
  .connectDB()
  .then(() => console.log("mongodb connected"))
  .catch((error) => console.error("error consoled from index catch", error));

RedisClient.connectRedis()
  .then(() => console.log("redis connected"))
  .catch((error) => console.log(error));

server.listen(Number(config.server.PORT), "0.0.0.0", () =>
  console.log(`server running at port ${config.server.PORT}`)
);
