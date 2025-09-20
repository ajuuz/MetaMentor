import { Router } from "express";
import {
  authMiddleware,
  paymentController,
} from "infrastructure/dependencyInjection/resolver";
import { validationMiddleware } from "presentation/middleware/validation.middleware";
import { ROLES } from "shared/constants";
import {
  RazorPayCreateOrderReqDTO,
  VerifyPaymentReqDTO,
} from "application/dto/requset/payment.dto";

export class PaymentRoutes {
  private _router: Router;

  constructor() {
    this._router = Router();
    this.configureRoutes();
  }

  configureRoutes(): void {
    this._router.use(
      authMiddleware.verifyAuth.bind(authMiddleware),
      authMiddleware.verifyAuthRole([ROLES.USER, ROLES.MENTOR]),
      authMiddleware.blockChecker.bind(authMiddleware)
    );

    this._router.post(
      "/createOrder",
      validationMiddleware(RazorPayCreateOrderReqDTO),
      paymentController.createOrder.bind(paymentController)
    );
    this._router.post(
      "/verifyPayment",
      validationMiddleware(VerifyPaymentReqDTO),
      paymentController.verifyPayment.bind(paymentController)
    );
  }

  getRouter(): Router {
    return this._router;
  }
}
