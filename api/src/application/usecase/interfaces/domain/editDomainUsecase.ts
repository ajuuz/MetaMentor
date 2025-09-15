import { EditDomainReqDTO } from "application/dto/requset/domain.dto";

export interface IEditDomainUsecase {
  execute(updationDetails: EditDomainReqDTO): Promise<void>;
}
