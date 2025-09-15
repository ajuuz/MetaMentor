import { plainToInstance } from "class-transformer";
import { IReviewRepository } from "domain/repositoryInterfaces/reviewRepository.interface";
import { ISlotRepository } from "domain/repositoryInterfaces/slotRepository.interface";
import { IGetDomainSlotsUsecase } from "application/usecase/interfaces/slot/getDomainSlotsUsecase.interface";
import { GetBookedReviewSlotsResDTO } from "shared/dto/response/review.dto";
import { GetSlotsForStudResDTO } from "shared/dto/response/slot.dto";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetDomainSlotsUsecase implements IGetDomainSlotsUsecase {
  constructor(
    @inject("ISlotRepository")
    private _slotRepository: ISlotRepository,

    @inject("IReviewRepository")
    private _reviewRepository: IReviewRepository
  ) {}

  async execute(domainId: string): Promise<{
    domainSlots: GetSlotsForStudResDTO[];
    bookedSlots: GetBookedReviewSlotsResDTO[];
  }> {
    const domainSlotsData = await this._slotRepository.getSlotsByDomains(
      domainId
    );
    const domainSlots = plainToInstance(
      GetSlotsForStudResDTO,
      domainSlotsData,
      {
        excludeExtraneousValues: true,
      }
    );
    const bookedSlotsData = await this._reviewRepository.findByDomain(domainId);
    const bookedSlots = plainToInstance(
      GetBookedReviewSlotsResDTO,
      bookedSlotsData,
      {
        excludeExtraneousValues: true,
      }
    );

    return { domainSlots, bookedSlots };
  }
}
