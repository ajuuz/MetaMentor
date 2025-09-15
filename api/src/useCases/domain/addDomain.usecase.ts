import { ICommunityEntity } from "domain/entities/communityModel.entity";
import { IDomainEntity } from "domain/entities/domainModel.entity";
import { ICreateLevelEntity } from "domain/entities/levelModel.entity";
import { ICommunityRepository } from "domain/repositoryInterfaces/communityRepository.interface";
import { IDomainRepository } from "domain/repositoryInterfaces/domainRepository.interface";
import { ILevelRepository } from "domain/repositoryInterfaces/levelRepository.interface";
import { IAddDomainUsecase } from "entities/usecaseInterfaces/domain/addDomainUsecase.interface";
import { CreateDomainReqDTO } from "shared/dto/request/domain.dto";
import { inject, injectable } from "tsyringe";

type CreateCommunity = Omit<ICommunityEntity, "_id" | "isBlocked">;
@injectable()
export class AddDomainUsecase implements IAddDomainUsecase {
  constructor(
    @inject("IDomainRepository")
    private _domainRepository: IDomainRepository,

    @inject("ILevelRepository")
    private _levelRepository: ILevelRepository,

    @inject("ICommunityRepository")
    private _communityRepository: ICommunityRepository
  ) {}

  async execute(domainDetails: CreateDomainReqDTO): Promise<void> {
    const { levels, ...rest } = domainDetails;

    const mappedDomain: Pick<
      IDomainEntity,
      "name" | "image" | "description" | "motive"
    > = {
      name: rest.name,
      image: rest.images[0],
      description: rest.description,
      motive: rest.motive,
    };

    const domain = this._domainRepository.create(mappedDomain);
    const domainId = domain._id.toString();
    const mappedLevels: ICreateLevelEntity[] = levels.map((level) => ({
      domainId,
      name: level.name,
      description: level.description,
      taskFile: level.taskFile,
      tasks: level.tasks.map((task) => ({
        type: task.type,
        content: task.content,
      })),
    }));

    const asyncOperations = [];
    asyncOperations.push(this._domainRepository.save(domain));
    asyncOperations.push(this._levelRepository.inserManyLevels(mappedLevels));

    const communityDetails: CreateCommunity = {
      communityId: domainId,
      name: domain.name,
    };
    asyncOperations.push(this._communityRepository.insertOne(communityDetails));

    await Promise.all(asyncOperations);
  }
}
