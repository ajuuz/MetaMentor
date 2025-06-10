import { Router } from "express";
import { upload } from "frameworks/cloudinary/cloudinary";
import { commonController, mentorController } from "frameworks/di/resolver";

export class MentorRoutes{

      private _router:Router;
    
        constructor(){
            this._router = Router();
            this.configureRoutes();
        }
    
    
        private configureRoutes():void{
            this._router.post('/register',mentorController.registerForm.bind(mentorController))
        }
    
        getRouter():Router{
            return this._router;
        }
}