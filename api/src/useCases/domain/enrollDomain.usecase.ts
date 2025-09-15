import { IEnrolledLevelEntity } from "domain/entities/enrolledLevelModel";
import { IEnrolledLevelRepository } from "entities/repositoryInterfaces/enrolledLevelRepository.interface";
import { ILevelRepository } from "entities/repositoryInterfaces/levelRepository.interface";
import { IStudentRepository } from "entities/repositoryInterfaces/student-repository.interface";
import { IEnrollDomainUsecase } from "entities/usecaseInterfaces/domain/enrollDomainUsecase.interface";
import { ValidationError } from "shared/utils/error/validationError";
import { inject, injectable } from "tsyringe";

@injectable()
export class EnrollDomainUsecase implements IEnrollDomainUsecase {
  constructor(
    @inject("IStudentRepository")
    private _studentRepository: IStudentRepository,

    @inject("ILevelRepository")
    private _levelRepository: ILevelRepository,

    @inject("IEnrolledLevelRepository")
    private _enrolledLevelRepository: IEnrolledLevelRepository
  ) {}

  async execute(
    studentId: string,
    domainId: string,
    fullCourse: boolean,
    selectedLevelsId?: string[]
  ): Promise<void> {
    let transformedLevelData: Omit<
      IEnrolledLevelEntity,
      "_id" | "assignments"
    >[];

    if (fullCourse) {
      const levelFilter = { domainId, isBlocked: false };
      const levelsData = await this._levelRepository.findWhole(levelFilter);
      transformedLevelData = levelsData.map((level) => {
        return {
          studentId,
          domainId,
          levelId: level._id,
        };
      });
    } else {
      if (!selectedLevelsId) throw new ValidationError();

      transformedLevelData = selectedLevelsId?.map((levelId) => {
        return {
          studentId,
          domainId,
          levelId,
        };
      });
    }

    const asyncOperations = [];
    asyncOperations.push(
      this._studentRepository.pushDomain(studentId, domainId)
    );
    asyncOperations.push(
      this._enrolledLevelRepository.insertMany(transformedLevelData)
    );
    await Promise.all(asyncOperations);
  }
}
