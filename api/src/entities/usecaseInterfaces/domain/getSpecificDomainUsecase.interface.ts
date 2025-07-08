import { DomainTypeDTO } from "shared/dto/domainDTO";



export interface IGetSpecificDomainUsecase{

    execute(domainId:string):Promise<DomainTypeDTO>
}