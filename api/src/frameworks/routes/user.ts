import { Router } from "express";
import { authMiddleware, userController, userDomainController, userSlotController } from "frameworks/di/resolver";
import { ROLES } from "shared/constants";



export class UserRoutes{

    private _router:Router

    constructor(){
        this._router = Router();
        this.configureRoutes();
    }

    private configureRoutes():void{

        //user
        this._router.get('/user',authMiddleware.verifyAuth.bind(authMiddleware),authMiddleware.verifyAuthRole([ROLES.USER,ROLES.MENTOR]),authMiddleware.blockChecker.bind(authMiddleware),userController.getDetails.bind(userController))
        this._router.patch('/user',authMiddleware.verifyAuth.bind(authMiddleware),authMiddleware.verifyAuthRole([ROLES.USER,ROLES.MENTOR]),authMiddleware.blockChecker.bind(authMiddleware),userController.updateUser.bind(userController))
        
        //domains
        this._router.get('/domains',userDomainController.getAllDomains.bind(userDomainController))
        this._router.get('/domains/:domainId',userDomainController.getSpecificDomain.bind(userDomainController))
        this._router.post('/domains/:domainId',authMiddleware.verifyAuth.bind(authMiddleware),authMiddleware.verifyAuthRole([ROLES.USER,ROLES.MENTOR]),authMiddleware.blockChecker.bind(authMiddleware),userDomainController.enrollDomain.bind(userDomainController))
        this._router.get('/dashboard',authMiddleware.verifyAuth.bind(authMiddleware),authMiddleware.verifyAuthRole([ROLES.USER,ROLES.MENTOR]),authMiddleware.blockChecker.bind(authMiddleware),userDomainController.getDomainDashboard.bind(userDomainController))
        this._router.get('/dashboard/:domainId',authMiddleware.verifyAuth.bind(authMiddleware),authMiddleware.verifyAuthRole([ROLES.USER,ROLES.MENTOR]),authMiddleware.blockChecker.bind(authMiddleware),userDomainController.getDomainInsight.bind(userDomainController))
        
        //slots
        this._router.get('/slots/:domainId',authMiddleware.verifyAuth.bind(authMiddleware),authMiddleware.verifyAuthRole([ROLES.USER,ROLES.MENTOR]),authMiddleware.blockChecker.bind(authMiddleware),userSlotController.getDomainSlots.bind(userSlotController))

    }

    getRouter():Router{
        return this._router;
    }
}