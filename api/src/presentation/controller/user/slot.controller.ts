import { IUserSlotController } from "application/interfaces/controller/user/userSlotController.interface";
import { IGetDomainSlotsUsecase } from "application/usecase/interfaces/slot/getDomainSlotsUsecase.interface";
import { IGetSlotsForStudUsecase } from "application/usecase/interfaces/slot/getSlotsForStudUsecase.interface";
import { ISlotValidityCheckerUsecase } from "application/usecase/interfaces/slot/slotValidityCheckerUsecase.interface";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export class UserSlotController implements IUserSlotController {
  constructor(
    @inject("IGetDomainSlotsUsecase")
    private _getDomainSlotsUsecase: IGetDomainSlotsUsecase,

    @inject("IGetSlotsForStudUsecase")
    private _getSlotsForStudUsecase: IGetSlotsForStudUsecase,

    @inject("ISlotValidityCheckerUsecase")
    private _slotValidityCheckerUsecase: ISlotValidityCheckerUsecase
  ) {}

  async getDomainSlots(req: Request, res: Response): Promise<void> {
    const { domainId } = req.verifiedData;
    const slots = await this._getDomainSlotsUsecase.execute(domainId);
    res.status(200).json(slots);
  }

  async getSlots(req: Request, res: Response): Promise<void> {
    const { mentorId, day } = req.verifiedData;
    console.log(mentorId, day);
    const slots = await this._getSlotsForStudUsecase.execute(mentorId, day);
    res.status(200).json(slots);
  }

  async slotValidityChecker(req: Request, res: Response): Promise<void> {
    const { mentorId, date, slotId } = req.verifiedData;

    await this._slotValidityCheckerUsecase.execute(mentorId, date, slotId);
    res.status(200).json({ success: true, message: "Slot is Valid" });
  }
}
