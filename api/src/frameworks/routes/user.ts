import { Router } from "express";
import { upload } from "frameworks/cloudinary/cloudinary";
import {
  authMiddleware,
  userCommunityController,
  userController,
  userDomainController,
  userMentorController,
  userReviewController,
  userSlotController,
} from "frameworks/di/resolver";
import { formDataParserFormatter } from "interfaceAdapters/middlewares/imageFormatter.middleware";
import { validationMiddleware } from "interfaceAdapters/middlewares/validation.middleware";
import { ROLES } from "shared/constants";
import { GetCommunitiesForStudReqDTO } from "shared/dto/request/community.dto";
import {
  EnrollDomainReqDTO,
  GetAllDomainsForStudReqDTO,
  GetDomainDashboardForStudReqDTO,
  GetDomainInsightReqDTO,
  GetSpecificDomainForStudReqDTO,
} from "shared/dto/request/domain.dto";
import { GetMentorsForStudReqDTO, UpdateMentorApplicationReqDTO } from "shared/dto/request/mentor.dto";
import {
  CancelReviewByStudReqDTO,
  GetAllReviewsForStudReqDTO,
  GetReviewByDayForStudReqDTO,
} from "shared/dto/request/review.dto";
import {
  GetDomainSlotsForStudReqDTO,
  GetSlotsForStudReqDTO,
  SlotValidityCheckReqDTO,
} from "shared/dto/request/slot.dto";
import { UpdateUserDetailsReqDTO } from "shared/dto/request/user.dto";

export class UserRoutes {
  private _router: Router;

  constructor() {
    this._router = Router();
    this.configureRoutes();
  }

  private configureRoutes(): void {
    // -------- Public Routes (no auth) --------

    //domains
    this._router.get(
      "/domains",
      validationMiddleware(GetAllDomainsForStudReqDTO),
      userDomainController.getAllDomains.bind(userDomainController)
    );
    this._router.get(
      "/domains/:domainId",
      validationMiddleware(GetSpecificDomainForStudReqDTO),
      userDomainController.getSpecificDomain.bind(userDomainController)
    );

    // -------- Protected Routes (auth required) --------
    //application level middleware
    this._router.use(
      authMiddleware.verifyAuth.bind(authMiddleware),
      authMiddleware.verifyAuthRole([ROLES.USER, ROLES.MENTOR]),
      authMiddleware.blockChecker.bind(authMiddleware)
    );

    //user
    this._router.get("/user", userController.getDetails.bind(userController));
    this._router.patch(
      "/user",
      upload.array('image'),
      formDataParserFormatter,
      validationMiddleware(UpdateUserDetailsReqDTO),
      userController.updateUser.bind(userController)
    );

    //domains
    this._router.post(
      "/domains/:domainId",
      validationMiddleware(EnrollDomainReqDTO),
      userDomainController.enrollDomain.bind(userDomainController)
    );
    this._router.get(
      "/dashboard",
      validationMiddleware(GetDomainDashboardForStudReqDTO),
      userDomainController.getDomainDashboard.bind(userDomainController)
    );
    this._router.get(
      "/dashboard/:domainId",
      validationMiddleware(GetDomainInsightReqDTO),
      userDomainController.getDomainInsight.bind(userDomainController)
    );

    // mentors
    this._router.get(
      "/application",
      authMiddleware.verifyAuthRole([ROLES.USER]),
      userMentorController.getMentorApplicationDetails.bind(
        userMentorController
      )
    );
    this._router.patch(
      "/application",
      authMiddleware.verifyAuthRole([ROLES.USER,ROLES.MENTOR]),
      upload.array("images", 5),
      formDataParserFormatter,
      validationMiddleware(UpdateMentorApplicationReqDTO),
      userMentorController.updateMentorApplication.bind(
        userMentorController
      )
    );

    this._router.get(
      "/mentors",
      validationMiddleware(GetMentorsForStudReqDTO),
      userMentorController.getMentorsForStud.bind(userMentorController)
    );

    //slots
    this._router.get(
      "/slots/:domainId",
      validationMiddleware(GetDomainSlotsForStudReqDTO),
      userSlotController.getDomainSlots.bind(userSlotController)
    );
    this._router.get(
      "/slots/:mentorId/:day",
      validationMiddleware(GetSlotsForStudReqDTO),
      userSlotController.getSlots.bind(userSlotController)
    );
    this._router.post(
      "/slots/:mentorId/:date/:slotId",
      validationMiddleware(SlotValidityCheckReqDTO),
      userSlotController.slotValidityChecker.bind(userSlotController)
    );

    //reviews
    this._router.get(
      "/reviews",
      validationMiddleware(GetAllReviewsForStudReqDTO),
      userReviewController.getAllReviews.bind(userReviewController)
    );
    this._router.get(
      "/reviews/:mentorId/:date",
      validationMiddleware(GetReviewByDayForStudReqDTO),
      userReviewController.getReviewsByDay.bind(userReviewController)
    );
    this._router.patch(
      "/reviews/:reviewId",
      validationMiddleware(CancelReviewByStudReqDTO),
      userReviewController.cancelReview.bind(userReviewController)
    );

    //community
    this._router.get(
      "/communities",
      validationMiddleware(GetCommunitiesForStudReqDTO),
      userDomainController.getDomainDashboard.bind(userDomainController)
    );
    this._router.get(
      "/dashboard/:domainId",
      userCommunityController.getAllCommunities.bind(userDomainController)
    );
  }

  getRouter(): Router {
    return this._router;
  }
}
