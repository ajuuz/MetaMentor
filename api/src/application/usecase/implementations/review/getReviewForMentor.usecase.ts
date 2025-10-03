import { NotFoundError } from "domain/errors/notFounError";
import { IReviewRepository } from "domain/repositoryInterfaces/reviewRepository.interface";

import { GetReviewForMentResDTO } from "application/dto/response/review.dto";
import { IGetReviewForMentorUsecase } from "application/usecase/interfaces/review/getReviewForMentorUsecase.interface";
import { plainToInstance } from "class-transformer";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetReviewForMentorUsecase implements IGetReviewForMentorUsecase {
  constructor(
    @inject("IReviewRepository")
    private _reviewRepository: IReviewRepository
  ) {}

  async execute(
    mentorId: string,
    reviewId: string
  ): Promise<GetReviewForMentResDTO> {
    const data = await this._reviewRepository.findReviewForMentor(
      mentorId,
      reviewId
    );
    const review = plainToInstance(GetReviewForMentResDTO, data, {
      excludeExtraneousValues: true,
    });
    if (!review) {
      throw new NotFoundError("Review Not found");
    }

    return review;
  }
}
