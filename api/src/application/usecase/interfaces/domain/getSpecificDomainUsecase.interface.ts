import { GetDomainResDTO } from "application/dto/response/domain.dto";
import { LevelResDTO } from "application/dto/response/level.dto";

type ReturnType = GetDomainResDTO & { levels: LevelResDTO[] };
export interface IGetSpecificDomainUsecase {
  execute(domainId: string, unBlockedLevels?: boolean): Promise<ReturnType>;
}
