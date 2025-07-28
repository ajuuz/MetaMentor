import { DomainReviewSlotResponseDTO } from "shared/dto/reviewDTO";
import { DomainSlotsResponseDTO } from "shared/dto/slotDTO";



export interface IGetDomainSlotsUsecase{
    execute(domainId:string):Promise<{domainSlots:DomainSlotsResponseDTO[],bookedSlots:DomainReviewSlotResponseDTO[]}>
}