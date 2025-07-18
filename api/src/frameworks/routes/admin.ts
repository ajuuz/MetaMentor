import { Router } from "express";
import { adminCommunityController, adminDomainController, adminMentorController, adminStudentController, authMiddleware } from "frameworks/di/resolver";
import { ROLES } from "shared/constants";

export class AdminRoutes{

    private _router:Router;

    constructor(){
        this._router = Router();
        this.configureRoutes();
    }


    private configureRoutes():void{
        //student
        this._router.get('/students',authMiddleware.verifyAuth.bind(authMiddleware),authMiddleware.verifyAuthRole([ROLES.ADMIN]),adminStudentController.getAllStudents.bind(adminStudentController))
        this._router.patch('/students/:userId',authMiddleware.verifyAuth.bind(authMiddleware),authMiddleware.verifyAuthRole([ROLES.ADMIN]),adminStudentController.updateStudentStatus.bind(adminStudentController))

        //mentor
        this._router.get('/mentors',authMiddleware.verifyAuth.bind(authMiddleware),authMiddleware.verifyAuthRole([ROLES.ADMIN]),adminMentorController.getAllMentors.bind(adminMentorController))
        this._router.get('/mentors/:mentorId',authMiddleware.verifyAuth.bind(authMiddleware),authMiddleware.verifyAuthRole([ROLES.ADMIN]),adminMentorController.getSpecificMentor.bind(adminMentorController))
        this._router.patch('/mentors/:mentorId/:applicationStatus',authMiddleware.verifyAuth.bind(authMiddleware),authMiddleware.verifyAuthRole([ROLES.ADMIN]),adminMentorController.mentorApplicationVerification.bind(adminMentorController))
        this._router.patch('/mentors/:mentorId',authMiddleware.verifyAuth.bind(authMiddleware),authMiddleware.verifyAuthRole([ROLES.ADMIN]),adminMentorController.updateMentorStatus.bind(adminMentorController))

        //domain
        this._router.post('/domains',authMiddleware.verifyAuth.bind(authMiddleware),authMiddleware.verifyAuthRole([ROLES.ADMIN]),adminDomainController.addDomain.bind(adminDomainController))
        this._router.get('/domains',authMiddleware.verifyAuth.bind(authMiddleware),authMiddleware.verifyAuthRole([ROLES.ADMIN]),adminDomainController.getAllDomains.bind(adminDomainController))
        this._router.patch('/domains/:domainId',authMiddleware.verifyAuth.bind(authMiddleware),authMiddleware.verifyAuthRole([ROLES.ADMIN]),adminDomainController.updateDomainStatus.bind(adminDomainController))

        //community
        this._router.get('/communities',authMiddleware.verifyAuth.bind(authMiddleware),authMiddleware.verifyAuthRole([ROLES.ADMIN]),adminCommunityController.getCommunities.bind(adminCommunityController))
        this._router.patch('/communities/:communityId',authMiddleware.verifyAuth.bind(authMiddleware),authMiddleware.verifyAuthRole([ROLES.ADMIN]),adminCommunityController.updateCommunityStatus.bind(adminCommunityController))
    }

    getRouter():Router{
        return this._router;
    }
}