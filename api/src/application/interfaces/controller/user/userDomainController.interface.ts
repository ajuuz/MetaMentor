import { Request, Response } from "express";

export interface IUserDomainController {
  getAllDomains(req: Request, res: Response): Promise<void>;
  getSpecificDomain(
    req: Request,
    res: Response,
  ): Promise<void>;
  enrollDomain(req: Request, res: Response): Promise<void>;
  getDomainDashboard(
    req: Request,
    res: Response,
  ): Promise<void>;
  getDomainInsight(
    req: Request,
    res: Response,
  ): Promise<void>;
}
