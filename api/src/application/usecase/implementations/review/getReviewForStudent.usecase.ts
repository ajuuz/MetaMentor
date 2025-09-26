import { plainToInstance } from "class-transformer";
import { IReviewRepository } from "domain/repositoryInterfaces/reviewRepository.interface";
import { GetReviewForStudResDTO } from "application/dto/response/review.dto";
import { NotFoundError } from "domain/errors/notFounError";
import { inject, injectable } from "tsyringe";
import { IGetReviewForStudentUsecase } from "application/usecase/interfaces/review/getReviewForStudentUsecase.interface";

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
