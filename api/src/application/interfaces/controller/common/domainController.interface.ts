import { Request, Response } from "express";

export interface ICommonDomainController {
  getDomainNamesAndId(req: Request, res: Response): Promise<void>;
}
