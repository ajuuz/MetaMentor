import { IEnrolledLevelRepository } from "domain/repositoryInterfaces/enrolledLevelRepository.interface";
import { ISaveLevelAssignmentUsecase } from "application/usecase/interfaces/enrolledLevel/saveLevelAssignmentUsecase.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class SaveLevelAssignmentUsecase implements ISaveLevelAssignmentUsecase {
  constructor(
    @inject("IEnrolledLevelRepository")
    private _enrolledLevelRepository: IEnrolledLevelRepository
  ) {}

  async execute(enrolledLevelId: string, assignments: string[]): Promise<void> {
    await this._enrolledLevelRepository.saveLevelAssignments(
      enrolledLevelId,
      assignments
    );
  }
}
