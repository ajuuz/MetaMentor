import 'reflect-metadata';
import { App } from "frameworks/http/server.js";
import { MongoConnect } from "frameworks/database/mongoDB/mongoConnect.js";
import { config } from "shared/config.js";

const app = new App();
const mongoConnect = new MongoConnect();

mongoConnect.connectDB();

app
  .getApp()
  .listen(config.server.PORT,()=>console.log(`server running at port ${config.server.PORT}`))
