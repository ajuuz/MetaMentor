import 'reflect-metadata'
import cookieParser from "cookie-parser"
import cors from 'cors';
import express, { Application } from 'express';
import { errorMiddleware } from 'frameworks/di/resolver';
import { AdminRoutes } from 'frameworks/routes/admin';
import { AuthRoutes } from 'frameworks/routes/auth';
import { CommonRoutes } from 'frameworks/routes/common';
import { MentorRoutes } from 'frameworks/routes/mentor';
import { PaymentRoutes } from 'frameworks/routes/payment';
import { UserRoutes } from 'frameworks/routes/user';
import { config } from 'shared/config';
export class App{
    private _app:Application;
    
    constructor(){
        this._app = express();
        this.configureMiddleware()
        this.configureRoutes();
        this.configureErrorMiddleware()
    }

    private configureRoutes():void{
        this._app.use("/api/auth",new AuthRoutes().getRouter());
        this._app.use("/api/admin",new AdminRoutes().getRouter());
        this._app.use("/api/mentor",new MentorRoutes().getRouter());
        this._app.use("/api/common",new CommonRoutes().getRouter());
        this._app.use("/api/payment",new PaymentRoutes().getRouter());
        this._app.use("/api",new UserRoutes().getRouter());
    }

    private configureMiddleware():void{
        this._app.use(cors({
        origin: config.client.uri, 
        credentials: true     
        }));
        this._app.use(cookieParser())
        this._app.use(express.json());
        this._app.use(express.urlencoded({extended:true}));
    }

    private configureErrorMiddleware():void{
        this._app.use(errorMiddleware.handleError.bind(errorMiddleware))
    }


    public getApp():Application{
        return this._app;
    }
}