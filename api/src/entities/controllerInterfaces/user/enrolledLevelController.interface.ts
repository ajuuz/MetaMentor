import { Request, Response } from "express";


export interface IUserEnrolledLevelController{
    saveLevelAssignments(req:Request,res:Response):Promise<void>
}