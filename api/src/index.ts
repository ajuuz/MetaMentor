import 'reflect-metadata';
import { MongoConnect } from "frameworks/database/mongoDB/mongoConnect.js";
import { App } from "frameworks/http/server.js";
import { RedisClient } from 'frameworks/redis/redisClient';
import { config } from "shared/config.js";
const app = new App();
const mongoConnect = new MongoConnect();

mongoConnect.connectDB()
.then(()=>console.log("mongodb connected"))
.catch((error)=>console.error(error))

RedisClient.connectRedis()
.then(()=>console.log('redis connected'))
.catch(error=>console.log(error))

app
  .getApp()
  .listen(config.server.PORT,()=>console.log(`server running at port ${config.server.PORT}`))
