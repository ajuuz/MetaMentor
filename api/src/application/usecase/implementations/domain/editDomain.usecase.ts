import { IDomainEntity } from "domain/entities/domainModel.entity";
import { ICreateLevelEntity } from "domain/entities/levelModel.entity";
import { IDomainRepository } from "domain/repositoryInterfaces/domainRepository.interface";
import { ILevelRepository } from "domain/repositoryInterfaces/levelRepository.interface";

import { EditDomainReqDTO } from "application/dto/requset/domain.dto";
import { IEditDomainUsecase } from "application/usecase/interfaces/domain/editDomainUsecase";
import { inject, injectable } from "tsyringe";

@injectable()
export class EditDomainUsecase implements IEditDomainUsecase {
  constructor(
    @inject("IDomainRepository")
    private _domainRepository: IDomainRepository,

    @inject("ILevelRepository")
    private _levelRepository: ILevelRepository
  ) {}

  async execute(updationDetails: EditDomainReqDTO): Promise<void> {
    const asyncOperations = [];
    const {
      domainId,
      name,
      images,
      description,
      motive,
      editRequiredLevels,
      newLevels,
    } = updationDetails;

    const mappedDomain: Partial<
      Pick<IDomainEntity, "name" | "image" | "description" | "motive">
    > = {};

    if (name) mappedDomain.name = name;
    if (description) mappedDomain.description = description;
    if (motive) mappedDomain.motive = motive;
    if (images?.length) mappedDomain.image = images[0];

    const filter: {
      field: keyof IDomainEntity;
      value: string | boolean | number;
    }[] = [];
    filter.push({ field: "_id", value: domainId });

    asyncOperations.push(
      this._domainRepository.updateOne(filter, mappedDomain)
    );

    if (newLevels && newLevels.length) {
      const mappedLevels: ICreateLevelEntity[] = newLevels.map((level) => ({
        domainId,
        name: level.name,
        description: level.description,
        taskFile: level.taskFile,
        tasks: level.tasks.map((task, index) => ({
          type: task.type,
          content: task.content,
        })),
      }));
      asyncOperations.push(this._levelRepository.inserManyLevels(mappedLevels));
    }

    if (editRequiredLevels && editRequiredLevels.length) {
      editRequiredLevels.forEach((level) => {
        const levelId = level._id;
        const rest = {
          name: level.name,
          description: level.description,
          taskFile: level.taskFile,
          tasks: level.tasks,
          isBlocked: level.isBlocked,
          domainId: domainId,
        };
        asyncOperations.push(this._levelRepository.replaceLevel(levelId, rest));
      });
    }
    await Promise.all(asyncOperations);
  }
}
