import { ISlotRepository } from "entities/repositoryInterfaces/slotRepository.interface";
import { IGetDomainSlotsUsecase } from "entities/usecaseInterfaces/slot/getDomainSlotsUsecase.interface";
import { DomainSlotsResponseDTO } from "shared/dto/slotDTO";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetDomainSlotsUsecase implements IGetDomainSlotsUsecase{

    constructor(
        @inject('ISlotRepository')
        private _slotRepository:ISlotRepository
    ){}

    async execute(domainId:string):Promise<DomainSlotsResponseDTO[]>{
        const slots = await this._slotRepository.getSlotsByDomains(domainId);
        return slots;
    }
}