import { IPaymentController } from "entities/controllerInterfaces/payment/paymentController";
import { ICreateOrderUsecase } from "entities/usecaseInterfaces/payment/createOrderUsecase.interface";
import { IVerifyPaymentUsecase } from "entities/usecaseInterfaces/payment/verifyPaymentUsecase.interface";
import { NextFunction, Request, Response } from "express";
import { ValidationError } from "shared/utils/error/validationError";
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

  async createOrder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const amount = req.body.amount;
    const slotId = req.body.slotId;
    console.log(amount, slotId);
    const order = await this._createOrderUsecase.execute(slotId, amount);
    res
      .status(200)
      .json({
        success: true,
        message: "razorpay order created successully",
        data: order,
      });
  }

  async verifyPayment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const razorPayDetails = req.body.razorPayDetails;
    const reviewDetails = req.body.reviewDetails;
    const studentId = (req as ModifiedRequest).user.id;

    if (!razorPayDetails || !reviewDetails || !studentId)
      throw new ValidationError();
    await this._verifyPaymentUsecase.execute(studentId, {
      razorPayDetails,
      reviewDetails,
    });
    res
      .status(201)
      .json({ success: true, message: "slot booked successfully" });
  }
}
