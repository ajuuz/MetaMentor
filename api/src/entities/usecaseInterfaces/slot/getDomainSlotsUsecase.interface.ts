import { DomainSlotsResponseDTO } from "shared/dto/slotDTO";



export interface IGetDomainSlotsUsecase{
    execute(domainId:string):Promise<DomainSlotsResponseDTO[]>
}