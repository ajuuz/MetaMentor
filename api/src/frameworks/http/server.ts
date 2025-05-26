import express, { Application } from 'express';


export class App{
    private _app:Application;
    
    constructor(){
        this._app = express();
        this.configureRoutes();
        this.configureMiddleware()
    }

    private configureRoutes():void{
        this._app.get("/",(req,res)=>{
            res.send("hello")
        })


    }

    private configureMiddleware():void{
        this._app.use(express.json());
        this._app.use(express.urlencoded({extended:true}));
    }


    public getApp():Application{
        return this._app;
    }
}