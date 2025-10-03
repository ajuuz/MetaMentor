import { GetCommunitiesForStudReqDTO } from "application/dto/requset/community.dto";
import { CreateCommunityPostReqDTO } from "application/dto/requset/communityPost.dto";
import {
  EnrollDomainReqDTO,
  GetAllDomainsForStudReqDTO,
  GetDomainDashboardForStudReqDTO,
  GetDomainInsightReqDTO,
  GetSpecificDomainForStudReqDTO,
} from "application/dto/requset/domain.dto";
import { SaveAssignmentReqDTO } from "application/dto/requset/enrolledLevel.dto";
import {
  GetMentorsForStudReqDTO,
  UpdateMentorApplicationReqDTO,
} from "application/dto/requset/mentor.dto";
import {
  CancelReviewByStudReqDTO,
  GetAllReviewsForStudReqDTO,
  GetReviewByDayForStudReqDTO,
  GetReviewForStudReqDTO,
  RescheduleReviewByStudReqDTO,
} from "application/dto/requset/review.dto";
import {
  GetDomainSlotsForStudReqDTO,
  GetSlotsForStudReqDTO,
  SlotValidityCheckReqDTO,
} from "application/dto/requset/slot.dto";
import { UpdateUserDetailsReqDTO } from "application/dto/requset/user.dto";
import { Router } from "express";
import { upload } from "infrastructure/config/cloudinary/cloudinary.config";
import {
  authMiddleware,
  userCommunityController,
  userCommunityPostController,
  userController,
  userDomainController,
  userEnrolledLevelController,
  userMentorController,
  userNotificationController,
  userRescheduledReviewController,
  userReviewController,
  userSlotController,
} from "infrastructure/dependencyInjection/resolver";
import { formDataParserFormatter } from "presentation/middleware/imageFormatter.middleware";
import { validationMiddleware } from "presentation/middleware/validation.middleware";
import { ROLES } from "shared/constants";

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

    //////////===================user========================//////////////
    this._router.get("/user", userController.getDetails.bind(userController));
    this._router.patch(
      "/user",
      upload.array("image"),
      formDataParserFormatter,
      validationMiddleware(UpdateUserDetailsReqDTO),
      userController.updateUser.bind(userController)
    );

    //====================domains==================///////////////
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

    //================== mentors============================//////////
    this._router.get(
      "/application",
      authMiddleware.verifyAuthRole([ROLES.USER]),
      userMentorController.getMentorApplicationDetails.bind(
        userMentorController
      )
    );
    this._router.patch(
      "/application",
      authMiddleware.verifyAuthRole([ROLES.USER, ROLES.MENTOR]),
      upload.array("images", 5),
      formDataParserFormatter,
      validationMiddleware(UpdateMentorApplicationReqDTO),
      userMentorController.updateMentorApplication.bind(userMentorController)
    );

    this._router.get(
      "/mentors",
      validationMiddleware(GetMentorsForStudReqDTO),
      userMentorController.getMentorsForStud.bind(userMentorController)
    );

    //==================slots======================//////////////
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

    //=====================reviews=====================////////////////
    this._router.get(
      "/reviews",
      validationMiddleware(GetAllReviewsForStudReqDTO),
      userReviewController.getAllReviews.bind(userReviewController)
    );
    this._router.get(
      "/reviews/count",
      userReviewController.getReviewCounts.bind(userReviewController)
    );
    this._router.get(
      "/reviews/:mentorId/:date",
      validationMiddleware(GetReviewByDayForStudReqDTO),
      userReviewController.getReviewsByDay.bind(userReviewController)
    );
    this._router.get(
      "/reviews/:reviewId",
      validationMiddleware(GetReviewForStudReqDTO),
      userReviewController.getSpecificReview.bind(userReviewController)
    );
    this._router.patch(
      "/reviews/:reviewId",
      validationMiddleware(CancelReviewByStudReqDTO),
      userReviewController.cancelReview.bind(userReviewController)
    );
    this._router.patch(
      "/reviews/:reviewId/reschedule",
      validationMiddleware(RescheduleReviewByStudReqDTO),
      userReviewController.rescheduleReview.bind(userReviewController)
    );

    //reschduled review
    this._router.get(
      "/rescheduledReviews/:reviewId",
      userRescheduledReviewController.getRescheduledReview.bind(
        userRescheduledReviewController
      )
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

    //notification
    this._router.get(
      "/notifications",
      userNotificationController.getNotifications.bind(
        userNotificationController
      )
    );
    this._router.patch(
      "/notifications",
      userNotificationController.markAsRead.bind(userNotificationController)
    );

    //enrolled levels
    this._router.patch(
      "/enrolledLevels/:enrolledLevelId",
      validationMiddleware(SaveAssignmentReqDTO),
      userEnrolledLevelController.saveLevelAssignments.bind(
        userEnrolledLevelController
      )
    );

    //community post///
    this._router.post(
      "/communities/:communityId/posts",
      upload.array("images", 1),
      formDataParserFormatter,
      validationMiddleware(CreateCommunityPostReqDTO),
      userCommunityPostController.createAPost.bind(userCommunityPostController)
    );
    this._router.post(
      "/communities/:communityId/posts",
      upload.array("images", 1),
      formDataParserFormatter,
      validationMiddleware(CreateCommunityPostReqDTO),
      userCommunityPostController.createAPost.bind(userCommunityPostController)
    );
    this._router.get(
      "/communities/:communityId/posts",
      userCommunityPostController.getCommunityPost.bind(
        userCommunityPostController
      )
    );
    this._router.get(
      "/communities/:communityId/chat",
      userCommunityController.getCommunityChat.bind(userCommunityController)
    );

    //communityPost
    this._router.get(
      "/posts/:postId/like",
      userCommunityPostController.getPostLikes.bind(userCommunityPostController)
    );
    this._router.post(
      "/posts/:postId/like",
      userCommunityPostController.likeAPost.bind(userCommunityPostController)
    );
    this._router.post(
      "/posts/:postId/unLike",
      userCommunityPostController.unLikeAPost.bind(userCommunityPostController)
    );
  }

  getRouter(): Router {
    return this._router;
  }
}
