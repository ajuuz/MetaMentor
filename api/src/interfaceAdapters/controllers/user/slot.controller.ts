import { IUserSlotController } from "entities/controllerInterfaces/user/userSlotController.interface";
import { IGetDomainSlotsUsecase } from "application/usecase/interfaces/slot/getDomainSlotsUsecase.interface";
import { IGetSlotsForStudUsecase } from "application/usecase/interfaces/slot/getSlotsForStudUsecase.interface";
import { ISlotValidityCheckerUsecase } from "application/usecase/interfaces/slot/slotValidityCheckerUsecase.interface";
import { Request, Response } from "express";
import {
  GetDomainSlotsForStudReqDTO,
  GetSlotsForStudReqDTO,
  SlotValidityCheckReqDTO,
} from "shared/dto/request/slot.dto";
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
    const { domainId }: GetDomainSlotsForStudReqDTO = req.verifiedData;
    const slots = await this._getDomainSlotsUsecase.execute(domainId);
    res.status(200).json(slots);
  }

  async getSlots(req: Request, res: Response): Promise<void> {
    const { mentorId, day }: GetSlotsForStudReqDTO = req.verifiedData;
    console.log(mentorId, day);
    const slots = await this._getSlotsForStudUsecase.execute(mentorId, day);
    res.status(200).json(slots);
  }

  async slotValidityChecker(req: Request, res: Response): Promise<void> {
    const { mentorId, date, slotId }: SlotValidityCheckReqDTO =
      req.verifiedData;

    await this._slotValidityCheckerUsecase.execute(mentorId, date, slotId);
    res.status(200).json({ success: true, message: "Slot is Valid" });
  }
}
