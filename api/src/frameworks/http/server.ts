import 'reflect-metadata'
import express, { Application } from 'express';
import cors from 'cors';
import { AuthRoutes } from 'frameworks/routes/auth';
import { config } from 'shared/config';

export class App{
    private _app:Application;
    
    constructor(){
        this._app = express();
        this.configureMiddleware()
        this.configureRoutes();
    }

    private configureRoutes():void{
        this._app.use("/api/auth",new AuthRoutes().getRouter());
    }

    private configureMiddleware():void{
        this._app.use(cors({
        origin: config.origin.uri, 
        credentials: true     
        }));
        this._app.use(express.json());
        this._app.use(express.urlencoded({extended:true}));
    }


    public getApp():Application{
        return this._app;
    }
}