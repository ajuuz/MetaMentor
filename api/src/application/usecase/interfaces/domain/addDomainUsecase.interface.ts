import { CreateDomainReqDTO } from "shared/dto/request/domain.dto";



export interface IAddDomainUsecase{
    execute(domainDetails:CreateDomainReqDTO):Promise<void>
}