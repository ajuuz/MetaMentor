import { Router } from "express";
import { authMiddleware, mentorController, mentorSlotController } from "frameworks/di/resolver";
import { ROLES } from "shared/constants";

export class MentorRoutes{

      private _router:Router;
    
        constructor(){
            this._router = Router();
            this.configureRoutes();
        }
    
    
        private configureRoutes():void{
            this._router.post('/register',authMiddleware.verifyAuth.bind(authMiddleware),authMiddleware.verifyAuthRole([ROLES.USER]),authMiddleware.blockChecker.bind(authMiddleware),mentorController.registerForm.bind(mentorController))

            //domains
            this._router.get('/domains',authMiddleware.verifyAuth.bind(authMiddleware),authMiddleware.verifyAuthRole([ROLES.USER]),authMiddleware.blockChecker.bind(authMiddleware),mentorController.getDomains.bind(mentorController))
            
            //slots
            this._router.post('/slots',authMiddleware.verifyAuth.bind(authMiddleware),authMiddleware.verifyAuthRole([ROLES.MENTOR]),authMiddleware.blockChecker.bind(authMiddleware),mentorSlotController.updateSlot.bind(mentorSlotController))
            this._router.get('/slots',authMiddleware.verifyAuth.bind(authMiddleware),authMiddleware.verifyAuthRole([ROLES.MENTOR]),authMiddleware.blockChecker.bind(authMiddleware),mentorSlotController.getSlots.bind(mentorSlotController))

        }
    
        getRouter():Router{
            return this._router;
        }
}