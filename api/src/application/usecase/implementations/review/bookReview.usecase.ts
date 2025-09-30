import { IReviewRepository } from "domain/repositoryInterfaces/reviewRepository.interface";
import { IBookReviewUsecase } from "application/usecase/interfaces/review/bookReviewUsecase.interface";
import { IReviewModel } from "infrastructure/database/models/bookedSlot.model";
import { PAYMENT_METHOD, PAYMENT_STATUS } from "shared/constants";
import { BookReviewReqDTO } from "application/dto/requset/payment.dto";
import { inject, injectable } from "tsyringe";
import { IReminderScheduleService } from "application/interfaces/service/reminderScheduleService.interface";

@injectable()
export class BookReviewUsecase implements IBookReviewUsecase {
  constructor(
    @inject("IReviewRepository")
    private _reviewRepository: IReviewRepository,

    @inject("IReminderScheduleService")
    private _reminderScheduleService: IReminderScheduleService,

  
  ) {}

  async create(
    studentId: string,
    reviewDetails: BookReviewReqDTO
  ): Promise<string> {
    const amount = reviewDetails.amount!;
    const commissionAmount = (amount * 10) / 100;
    const mentorEarning = amount - commissionAmount;
    const payment = {
      method: PAYMENT_METHOD.UPI,
      status: PAYMENT_STATUS.SUCCESS,
    };
    const bookingDetails = {
      domainId: reviewDetails.domainId,
      levelId: reviewDetails.levelId,
      mentorId: reviewDetails.mentorId,
      slot: reviewDetails.slot,
      studentId,
      commissionAmount,
      mentorEarning,
      payment,
    };
    const review = await this._reviewRepository.createAReview(bookingDetails);
    await this._reminderScheduleService.scheduleReminder(review);
    
    return review._id;
  }

  async save(review: IReviewModel): Promise<void> {
    await this._reviewRepository.save(review);
  }
}
