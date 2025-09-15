import { IMentorSlotController } from "application/interfaces/controller/mentor/slotController.inteface";
import { IGetMentorSlotsUsecase } from "application/usecase/interfaces/slot/getMentorSlotsUsecase.interface";
import { IGetSlotsForStudUsecase } from "application/usecase/interfaces/slot/getSlotsForStudUsecase.interface";
import { ISlotValidityCheckerUsecase } from "application/usecase/interfaces/slot/slotValidityCheckerUsecase.interface";
import { IUpdateSlotStatusUsecase } from "application/usecase/interfaces/slot/updateSlotStatusUsecase.interface";
import { IUpdateSlotUsecase } from "application/usecase/interfaces/slot/updateSlotUsecase.interface";
import { Request, Response } from "express";
import {
  UpdateSlotReqDTO,
  UpdateSlotStatusReqDTO,
} from "shared/dto/request/slot.dto";
import { inject, injectable } from "tsyringe";
import { ModifiedRequest } from "type/types";

@injectable()
export class MentorSlotController implements IMentorSlotController {
  constructor(
    @inject("IUpdateSlotUsecase")
    private _updateSlotUsecase: IUpdateSlotUsecase,

    @inject("IGetMentorSlotsUsecase")
    private _IGetMentorSlotsUsecase: IGetMentorSlotsUsecase,

    @inject("IGetSlotsForStudUsecase")
    private _getSlotsForStudUsecase: IGetSlotsForStudUsecase,

    @inject("IUpdateSlotStatusUsecase")
    private _updateSlotStatusUsecase: IUpdateSlotStatusUsecase,

    @inject("ISlotValidityCheckerUsecase")
    private _slotValidityCheckerUsecase: ISlotValidityCheckerUsecase
  ) {}

  async updateSlot(req: Request, res: Response): Promise<void> {
    const weekSlots: UpdateSlotReqDTO = req.verifiedData;
    const mentorId = (req as ModifiedRequest).user.id;

    await this._updateSlotUsecase.execute(mentorId, weekSlots);
    res
      .status(201)
      .json({ success: true, message: "Slot updated Successfully" });
  }

  async getSlots(req: Request, res: Response): Promise<void> {
    const mentorId = (req as ModifiedRequest).user.id;

    const weekSlots = await this._IGetMentorSlotsUsecase.execute(mentorId);
    res.status(201).json(weekSlots);
  }

  async getSlotsForADay(req: Request, res: Response): Promise<void> {
    const { day } = req.verifiedData;
    const mentorId = (req as ModifiedRequest).user.id;
    const slots = await this._getSlotsForStudUsecase.execute(mentorId, day);
    res.status(200).json(slots);
  }

  async updateSlotStatus(req: Request, res: Response): Promise<void> {
    const slotStatusUpdationDetails: UpdateSlotStatusReqDTO = req.verifiedData;
    const mentorId = (req as ModifiedRequest).user.id;

    await this._updateSlotStatusUsecase.execute(
      mentorId,
      slotStatusUpdationDetails
    );
    res
      .status(200)
      .json({ success: true, message: "slot status updated successfully" });
  }

  async slotValidityChecker(req: Request, res: Response): Promise<void> {
    const { date, slotId } = req.verifiedData;
    const mentorId = (req as ModifiedRequest).user.id;
    await this._slotValidityCheckerUsecase.execute(mentorId, date, slotId);
    res.status(200).json({ success: true, message: "Slot is Valid" });
  }
}
