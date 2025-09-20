import { ILevelRepository } from "domain/repositoryInterfaces/levelRepository.interface";
import { IUpdateLevelStatusUsecase } from "application/usecase/interfaces/level/updateLevelStatusUsecase.interface";
import { ValidationError } from "domain/errors/validationError";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateLevelStatusUsecase implements IUpdateLevelStatusUsecase {
  constructor(
    @inject("ILevelRepository")
    private _levelRepository: ILevelRepository
  ) {}
  async execute(levelId: string, status: boolean): Promise<void> {
    if (!levelId || (status !== false && !status))
      throw new ValidationError("Required fields are not recieved");
    await this._levelRepository.updateStatus(levelId, status);
  }
}
