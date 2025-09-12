import { Request, Response } from "express";

export interface IMentorSlotController {
  updateSlot(req: Request, res: Response): Promise<void>;
  getSlots(req: Request, res: Response): Promise<void>;
  getSlotsForADay(req: Request, res: Response): Promise<void>;
  updateSlotStatus(req: Request, res: Response): Promise<void>;
  slotValidityChecker(req: Request, res: Response): Promise<void>
}
