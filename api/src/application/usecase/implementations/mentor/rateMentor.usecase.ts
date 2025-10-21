import { inject, injectable } from "tsyringe";
import { IMentorRepository } from "domain/repositoryInterfaces/mentorRepository.interface";
import { ValidationError } from "domain/errors/validationError";
import { IRateMentorUseCase } from "application/usecase/interfaces/mentor/rateMentorUsecase.interface";

@injectable()
export class RateMentorUseCase implements IRateMentorUseCase {
  constructor(
    @inject("IMentorRepository")
    private readonly _mentorRepository: IMentorRepository
  ) {}

  async execute(mentorId: string, rating: number): Promise<void> {
    // Validate inputs
    if (!mentorId) throw new ValidationError("Mentor ID is required");
    if (rating < 1 || rating > 5) {
      throw new ValidationError("Rating must be between 1 and 5");
    }

    // Rate the mentor
    await this._mentorRepository.rateUser(mentorId, rating);
  }
}
