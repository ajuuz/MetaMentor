import { Request, Response } from "express";


export interface IAdminLevelController{
    updateLevelStatus(req: Request, res: Response): Promise<void> 
}