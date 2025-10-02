import { IPaymentScheduleService } from "application/interfaces/service/paymentScheduleService.interface";
import { paymentQueue } from "infrastructure/queues/payment.queue";

export class PaymentScheduleService implements IPaymentScheduleService {
  async schedulePayment(reviewId: string, mentorId: string): Promise<void> {
    const now = new Date();
    //  2 * 24 * 60 * 60 * 1000
    const payAt = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);

    await paymentQueue.add(
      "releasePayment",
      {
        reviewId,
        mentorId,
      },
      {
        delay: payAt.getTime() - Date.now(),
        attempts: 3,
      }
    );

    console.log(
      `💰 Payment scheduled for review ${reviewId} to mentor ${mentorId} at ${payAt}`
    );
  }
}
