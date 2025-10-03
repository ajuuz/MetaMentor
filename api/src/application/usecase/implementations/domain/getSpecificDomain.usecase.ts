import { ILevelEntity } from "domain/entities/levelModel.entity";
import { NotFoundError } from "domain/errors/notFounError";
import { IDomainRepository } from "domain/repositoryInterfaces/domainRepository.interface";
import { ILevelRepository } from "domain/repositoryInterfaces/levelRepository.interface";

import { GetDomainResDTO } from "application/dto/response/domain.dto";
import { LevelResDTO } from "application/dto/response/level.dto";
import { IGetSpecificDomainUsecase } from "application/usecase/interfaces/domain/getSpecificDomainUsecase.interface";
import { plainToInstance } from "class-transformer";
import { inject, injectable } from "tsyringe";

type ReturnType = GetDomainResDTO & { levels: LevelResDTO[] };

@injectable()
export class GetSpecificDomainUsecase implements IGetSpecificDomainUsecase {
  constructor(
    @inject("IDomainRepository")
    private _domainRepository: IDomainRepository,

    @inject("ILevelRepository")
    private _levelRepository: ILevelRepository
  ) {}

  async execute(
    domainId: string,
    unBlockedLevels?: boolean
  ): Promise<ReturnType> {
    const domainFilter = { _id: domainId };
    const domainData = await this._domainRepository.findOne(domainFilter);
    if (!domainData) throw new NotFoundError("Domain not found");

    const domain = plainToInstance(GetDomainResDTO, domainData, {
      excludeExtraneousValues: true,
    });

    const levelFilter: Partial<ILevelEntity> = { domainId };
    if (unBlockedLevels) levelFilter.isBlocked = false;
    const levelsData = await this._levelRepository.findWhole(levelFilter);
    const levels = plainToInstance(LevelResDTO, levelsData, {
      excludeExtraneousValues: true,
    });
    return { ...domain, levels };
  }
}
