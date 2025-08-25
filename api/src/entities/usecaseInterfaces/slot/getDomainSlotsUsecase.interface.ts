import { GetBookedReviewSlotsResDTO } from "shared/dto/response/review.dto";
import { GetSlotsForStudResDTO } from "shared/dto/response/slot.dto";

export interface IGetDomainSlotsUsecase {
  execute(
    domainId: string
  ): Promise<{
    domainSlots: GetSlotsForStudResDTO[];
    bookedSlots: GetBookedReviewSlotsResDTO[];
  }>;
}
