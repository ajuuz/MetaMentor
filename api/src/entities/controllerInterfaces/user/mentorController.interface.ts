import { Request, Response } from "express";


export interface IUserMentorController{
    getMentorsForStud(req: Request, res: Response): Promise<void> 
}