import mongoose from "mongoose";
import { config } from "shared/config";

export class MongoConnect{

    private _dbUrl:string;
    constructor(){
        this._dbUrl = config.database.URI;
    }

    async connectDB(){
        try{
            await mongoose.connect(this._dbUrl)
            console.log('db connected successfully')

            mongoose.connection.on('error',(error)=>{
                console.error("MongoDB connection error",error)
            })
            
            mongoose.connection.on('disconnected',()=>{
                console.log("MongoDB disconnected")
            })
        }
        catch(err){
            console.error("Failed to connect to MongoDB",err);
        }
    }
}