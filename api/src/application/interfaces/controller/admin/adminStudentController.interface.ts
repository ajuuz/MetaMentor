import { NextFunction, Request, Response } from "express";

export interface IAdminStudentController{
    getAllStudents(req:Request,res:Response,next:NextFunction):Promise<void>;
    updateStudentStatus(req:Request,res:Response,next:NextFunction):Promise<void>;
}