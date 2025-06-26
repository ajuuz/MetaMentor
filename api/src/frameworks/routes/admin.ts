import { Router } from "express";
import { adminMentorController, adminStudentController, authMiddleware } from "frameworks/di/resolver";
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
    }

    getRouter():Router{
        return this._router;
    }
}