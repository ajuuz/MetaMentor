import { Request, Response } from "express";

export interface IMentorController {
  registerForm(req: Request, res: Response): Promise<void>;
  getProfessionalDetails(req: Request, res: Response): Promise<void>;
}
