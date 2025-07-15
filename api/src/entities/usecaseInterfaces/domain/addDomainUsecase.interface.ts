import { DomainRequestDTO } from "shared/dto/domainDTO";



export interface IAddDomainUsecase{
    execute(domainDetails:DomainRequestDTO):Promise<void>
}