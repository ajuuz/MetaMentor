import { ISlotEntity, ISlotTime } from "domain/entities/slotModel.entity";

import {
  DomainSlotsResponseDTO,
  SlotDTO,
  WeekSlotsRequestDTO,
} from "application/dto/slotDTO";
import { ISlotModel } from "infrastructure/database/models/slot.model";
import { BaseRepository } from "interfaceAdapters/repositories/base.repository";
import { DAYS } from "shared/constants";

export interface ISlotRepository
  extends BaseRepository<ISlotEntity, ISlotModel> {
  updateSlots(mentorId: string, weekSlots: WeekSlotsRequestDTO): Promise<void>;
  createSlots(mentorId: string): Promise<void>;
  updateSlotStatus(
    mentorId: string,
    day: string,
    slotId: string,
    slotStatus: boolean
  ): Promise<void>;
  getSlotsByDomains(domainId: string): Promise<DomainSlotsResponseDTO[]>;
  getSpecificSlot(
    mentorId: string,
    day: string,
    slotId: string
  ): Promise<SlotDTO | null>;
  findAllSlotsOfaDay(mentorId: string, day: DAYS): Promise<ISlotTime[]>;
}
