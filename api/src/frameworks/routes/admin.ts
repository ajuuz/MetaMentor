import { Router } from "express";
import { adminMentorController, adminStudentController } from "frameworks/di/resolver";

export class AdminRoutes{

    private _router:Router;

    constructor(){
        this._router = Router();
        this.configureRoutes();
    }


    private configureRoutes():void{
        //student
        this._router.get('/students',adminStudentController.getAllStudents.bind(adminStudentController))
        this._router.patch('/students/:userId',adminStudentController.updateStudentStatus.bind(adminStudentController))

        //mentor
        this._router.get('/mentors',adminMentorController.getAllMentors.bind(adminMentorController))
        this._router.get('/mentors/:mentorId',adminMentorController.getSpecificMentor.bind(adminMentorController))
        this._router.patch('/mentors/:mentorId/:applicationStatus',adminMentorController.mentorApplicationVerification.bind(adminMentorController))
    }

    getRouter():Router{
        return this._router;
    }
}