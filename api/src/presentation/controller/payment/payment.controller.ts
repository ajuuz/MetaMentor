import { IPaymentController } from "application/interfaces/controller/payment/paymentController";
import { ICreateOrderUsecase } from "application/usecase/interfaces/payment/createOrderUsecase.interface";
import { IVerifyPaymentUsecase } from "application/usecase/interfaces/payment/verifyPaymentUsecase.interface";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { ModifiedRequest } from "type/types";

@injectable()
export class PaymentController implements IPaymentController {
  constructor(
    @inject("ICreateOrderUsecase")
    private _createOrderUsecase: ICreateOrderUsecase,

    @inject("IVerifyPaymentUsecase")
    private _verifyPaymentUsecase: IVerifyPaymentUsecase
  ) {}

  async createOrder(req: Request, res: Response): Promise<void> {
    const { amount, slotId } = req.verifiedData;
    const order = await this._createOrderUsecase.execute(slotId, amount);
    res.status(200).json({
      success: true,
      message: "razorpay order created successully",
      data: order,
    });
  }

  async verifyPayment(req: Request, res: Response): Promise<void> {
    const paymentAndReviewDetails = req.verifiedData;
    const studentId = (req as ModifiedRequest).user.id;

    await this._verifyPaymentUsecase.execute(
      studentId,
      paymentAndReviewDetails
    );
    res
      .status(201)
      .json({ success: true, message: "slot booked successfully" });
  }
}
