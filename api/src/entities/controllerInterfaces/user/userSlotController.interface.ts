import {  Request, Response } from "express";

export interface IUserSlotController {
  getDomainSlots(
    req: Request,
    res: Response,
  ): Promise<void>;
  slotValidityChecker(
    req: Request,
    res: Response,
  ): Promise<void>;
}
