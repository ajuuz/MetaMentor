import { Router } from "express";
import { upload } from "infrastructure/config/cloudinary/cloudinary.config";
import {
  authMiddleware,
  mentorController,
  mentorReviewController,
  mentorSlotController,
} from "infrastructure/dependencyInjection/resolver";
import { formDataParserFormatter } from "interfaceAdapters/middlewares/imageFormatter.middleware";
import { validationMiddleware } from "interfaceAdapters/middlewares/validation.middleware";
import { ROLES } from "shared/constants";
import { CreateMentorApplicationReqDTO } from "shared/dto/request/mentor.dto";
import {
  CancelReviewByMentorReqDTO,
  GetReviewsForMentorReqDTO,
  GetReviewForMentorReqDTO,
  SubmitReviewResultReqDTO,
  GetReviewByDayForMentReqDTO,
} from "shared/dto/request/review.dto";
import {
  GetSlotsOfADayForMentReqDTO,
  SlotValidityCheckForMentReqDTO,
  UpdateSlotReqDTO,
  UpdateSlotStatusReqDTO,
} from "shared/dto/request/slot.dto";

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
      upload.array("images", 5),
      formDataParserFormatter,
      validationMiddleware(CreateMentorApplicationReqDTO),
      mentorController.registerForm.bind(mentorController)
    );

    // -------- Protected Routes (auth required) --------
    //application level middleware
    this._router.use(
      authMiddleware.verifyAuth.bind(authMiddleware),
      authMiddleware.verifyAuthRole([ROLES.MENTOR]),
      authMiddleware.blockChecker.bind(authMiddleware)
    );

    //mentor
    this._router.get(
      "/details/professional",
      mentorController.getProfessionalDetails.bind(mentorController)
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
    this._router.get(
      "/slots/:day",
      validationMiddleware(GetSlotsOfADayForMentReqDTO),
      mentorSlotController.getSlotsForADay.bind(mentorSlotController)
    );
    this._router.patch(
      "/slots/:day/:slotId",
      validationMiddleware(UpdateSlotStatusReqDTO),
      mentorSlotController.updateSlotStatus.bind(mentorSlotController)
    );
    this._router.post(
      "/slots/:date/:slotId",
      validationMiddleware(SlotValidityCheckForMentReqDTO),
      mentorSlotController.slotValidityChecker.bind(mentorSlotController)
    );

    //reviews
    this._router.get(
      "/reviews",
      validationMiddleware(GetReviewsForMentorReqDTO),
      mentorReviewController.getAllReviews.bind(mentorReviewController)
    );
    this._router.get(
      "/reviews/:date/date",
      validationMiddleware(GetReviewByDayForMentReqDTO),
      mentorReviewController.getReviewsByDay.bind(mentorReviewController)
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

    this._router.patch(
      "/reviews/:reviewId/reschedule/submit",
      mentorReviewController.rescheduleReviewSubmit.bind(mentorReviewController)
    );
  }

  getRouter(): Router {
    return this._router;
  }
}
