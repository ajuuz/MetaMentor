import { IReviewRepository } from "entities/repositoryInterfaces/reviewRepository.interface";
import { ISlotRepository } from "entities/repositoryInterfaces/slotRepository.interface";
import { IGetDomainSlotsUsecase } from "entities/usecaseInterfaces/slot/getDomainSlotsUsecase.interface";
import { DomainReviewSlotResponseDTO } from "shared/dto/reviewDTO";
import { DomainSlotsResponseDTO } from "shared/dto/slotDTO";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetDomainSlotsUsecase implements IGetDomainSlotsUsecase{

    constructor(
        @inject('ISlotRepository')
        private _slotRepository:ISlotRepository,

        @inject('IReviewRepository')
        private _reviewRepository:IReviewRepository
    ){}

    async execute(domainId:string):Promise<{domainSlots:DomainSlotsResponseDTO[],bookedSlots:DomainReviewSlotResponseDTO[]}>{
        const domainSlots = await this._slotRepository.getSlotsByDomains(domainId);
        const bookedSlots = await this._reviewRepository.findByDomain(domainId)
        return {domainSlots,bookedSlots};
    }
}