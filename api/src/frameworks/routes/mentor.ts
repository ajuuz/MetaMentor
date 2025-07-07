import { Router } from "express";
import { authMiddleware, mentorController } from "frameworks/di/resolver";
import { ROLES } from "shared/constants";

export class MentorRoutes{

      private _router:Router;
    
        constructor(){
            this._router = Router();
            this.configureRoutes();
        }
    
    
        private configureRoutes():void{
            this._router.post('/register',authMiddleware.verifyAuth.bind(authMiddleware),authMiddleware.verifyAuthRole([ROLES.USER]),authMiddleware.blockChecker.bind(authMiddleware),mentorController.registerForm.bind(mentorController))
            this._router.get('/domains',authMiddleware.verifyAuth.bind(authMiddleware),authMiddleware.verifyAuthRole([ROLES.USER]),authMiddleware.blockChecker.bind(authMiddleware),mentorController.getDomains.bind(mentorController))
        }
    
        getRouter():Router{
            return this._router;
        }
}