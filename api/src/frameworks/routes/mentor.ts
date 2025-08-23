import { Router } from "express";
import {
  authMiddleware,
  mentorController,
  mentorReviewController,
  mentorSlotController,
} from "frameworks/di/resolver";
import { validationMiddleware } from "interfaceAdapters/middlewares/validation.middleware";
import { ROLES } from "shared/constants";
import { ApplyForMentorReqDTO } from "shared/dto/request/mentor.dto";
import {
    CancelReviewByMentorReqDTO,
  GetReviewsForMentorReqDTO,
  GetReviewForMentorReqDTO,
  SubmitReviewResultReqDTO,
} from "shared/dto/request/review.dto";
import { UpdateSlotReqDTO, UpdateSlotStatusReqDTO } from "shared/dto/request/slot.dto";

export class MentorRoutes {
  private _router: Router;

  constructor() {
    this._router = Router();
    this.configureRoutes();
  }

  private configureRoutes(): void {
    this._router.post(
      "/register",
      authMiddleware.verifyAuth.bind(authMiddleware),
      authMiddleware.verifyAuthRole([ROLES.USER]),
      authMiddleware.blockChecker.bind(authMiddleware),
      validationMiddleware(ApplyForMentorReqDTO),
      mentorController.registerForm.bind(mentorController)
    );

    //domains
    this._router.get(
      "/domains",
      authMiddleware.verifyAuth.bind(authMiddleware),
      authMiddleware.verifyAuthRole([ROLES.USER]),
      authMiddleware.blockChecker.bind(authMiddleware),
      mentorController.getDomains.bind(mentorController)
    );

    // -------- Protected Routes (auth required) --------
    //application level middleware
    this._router.use(
      authMiddleware.verifyAuth.bind(authMiddleware),
      authMiddleware.verifyAuthRole([ROLES.MENTOR]),
      authMiddleware.blockChecker.bind(authMiddleware)
    );

    //slots
    this._router.patch(
      "/slots",
      validationMiddleware(UpdateSlotReqDTO),
      mentorSlotController.updateSlot.bind(mentorSlotController)
    );
    this._router.get(
      "/slots",
      mentorSlotController.getSlots.bind(mentorSlotController)
    );
    this._router.patch(
      "/slots/:day/:slotId",
      validationMiddleware(UpdateSlotStatusReqDTO),
      mentorSlotController.updateSlotStatus.bind(mentorSlotController)
    );

    //reviews
    this._router.get(
      "/reviews",
      validationMiddleware(GetReviewsForMentorReqDTO),
      mentorReviewController.getAllReviews.bind(mentorReviewController)
    );
    this._router.get(
      "/reviews/:reviewId",
      validationMiddleware(GetReviewForMentorReqDTO),
      mentorReviewController.getReview.bind(mentorReviewController)
    );
    this._router.patch(
      "/reviews/:reviewId/cancel",
      validationMiddleware(CancelReviewByMentorReqDTO),
      mentorReviewController.cancelReview.bind(mentorReviewController)
    );
    this._router.patch(
      "/reviews/:reviewId/result",
      validationMiddleware(SubmitReviewResultReqDTO),
      mentorReviewController.submitReviewResult.bind(mentorReviewController)
    );
  }

  getRouter(): Router {
    return this._router;
  }
}
