import {  EditDomainReqDTO } from "shared/dto/request/domain.dto";



export interface IEditDomainUsecase{
    execute(updationDetails:EditDomainReqDTO):Promise<void>
}