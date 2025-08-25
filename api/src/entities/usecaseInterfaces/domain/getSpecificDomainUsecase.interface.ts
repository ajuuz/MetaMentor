import { GetDomainResDTO } from "shared/dto/response/domain.dto";
import { LevelResDTO } from "shared/dto/response/level.dto";


type ReturnType=GetDomainResDTO & {levels:LevelResDTO[]}
export interface IGetSpecificDomainUsecase{

    execute(domainId:string):Promise<ReturnType>
}