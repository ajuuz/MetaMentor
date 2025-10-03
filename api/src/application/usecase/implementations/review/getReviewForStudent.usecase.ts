import { NotFoundError } from "domain/errors/notFounError";
import { IReviewRepository } from "domain/repositoryInterfaces/reviewRepository.interface";

import { GetReviewForStudResDTO } from "application/dto/response/review.dto";
import { IGetReviewForStudentUsecase } from "application/usecase/interfaces/review/getReviewForStudentUsecase.interface";
import { plainToInstance } from "class-transformer";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetReviewForStudentUsecase implements IGetReviewForStudentUsecase {
  constructor(
    @inject("IReviewRepository")
    private _reviewRepository: IReviewRepository
  ) {}

  async execute(
    mentorId: string,
    reviewId: string
  ): Promise<GetReviewForStudResDTO> {
    const data = await this._reviewRepository.findReviewForStudent(
      mentorId,
      reviewId
    );
    const review = plainToInstance(GetReviewForStudResDTO, data, {
      excludeExtraneousValues: true,
    });
    if (!review) {
      throw new NotFoundError("Review Not found");
    }

    return review;
  }
}
