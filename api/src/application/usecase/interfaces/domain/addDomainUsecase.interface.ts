import { CreateDomainReqDTO } from "application/dto/requset/domain.dto";

export interface IAddDomainUsecase {
  execute(domainDetails: CreateDomainReqDTO): Promise<void>;
}
