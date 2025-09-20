import { GetBookedReviewSlotsResDTO } from "application/dto/response/review.dto";
import { GetSlotsForStudResDTO } from "application/dto/response/slot.dto";

export interface IGetDomainSlotsUsecase {
  execute(domainId: string): Promise<{
    domainSlots: GetSlotsForStudResDTO[];
    bookedSlots: GetBookedReviewSlotsResDTO[];
  }>;
}
