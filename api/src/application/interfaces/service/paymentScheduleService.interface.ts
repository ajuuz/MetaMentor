export interface IPaymentScheduleService {
  schedulePayment(
    reviewId: string,
    mentorId: string,
  ): Promise<void>;
}
