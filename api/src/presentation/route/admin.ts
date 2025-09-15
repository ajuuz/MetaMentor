import { Router } from "express";
import { upload } from "infrastructure/config/cloudinary/cloudinary.config";
import {
  adminCommunityController,
  adminDomainController,
  adminLevelController,
  adminMentorController,
  adminStudentController,
  authMiddleware,
} from "infrastructure/dependencyInjection/resolver";
import { formDataParserFormatter } from "presentation/middleware/imageFormatter.middleware";
import { validationMiddleware } from "presentation/middleware/validation.middleware";
import { ROLES } from "shared/constants";
import {
  GetCommunitiesForAdminReqDTO,
  UpdateCommunityStatusDTO,
} from "application/dto/requset/community.dto";
import {
  CreateDomainReqDTO,
  EditDomainReqDTO,
  GetAllDomainsForAdminReqDTO,
  GetDomainForAdminReqDTO,
  UpdateDomainStatusDTO,
} from "application/dto/requset/domain.dto";
import { UpdateLevelStatusDTO } from "application/dto/requset/level.dto";
import {
  GetAllMentorsReqDTO,
  GetSpecificMentorReqDTO,
  MentorApplicationVerificationReqDTO,
  UpdateMentorStatusReqDTO,
} from "application/dto/requset/mentor.dto";
import {
  GetAllStudentReqDTO,
  UpdateStudentStatusReqDTO,
} from "application/dto/requset/student.dto";

export class AdminRoutes {
  private _router: Router;

  constructor() {
    this._router = Router();
    this.configureRoutes();
  }

  private configureRoutes(): void {
    ///------application level------//
    this._router.use(
      authMiddleware.verifyAuth.bind(authMiddleware),
      authMiddleware.verifyAuthRole([ROLES.ADMIN])
    );
    //student
    this._router.get(
      "/students",
      validationMiddleware(GetAllStudentReqDTO),
      adminStudentController.getAllStudents.bind(adminStudentController)
    );
    this._router.patch(
      "/students/:userId",
      validationMiddleware(UpdateStudentStatusReqDTO),
      adminStudentController.updateStudentStatus.bind(adminStudentController)
    );

    //mentor
    this._router.get(
      "/mentors",
      validationMiddleware(GetAllMentorsReqDTO),
      adminMentorController.getAllMentors.bind(adminMentorController)
    );
    this._router.get(
      "/mentors/:mentorId",
      validationMiddleware(GetSpecificMentorReqDTO),
      adminMentorController.getMentorApplicationDetails.bind(
        adminMentorController
      )
    );
    this._router.patch(
      "/mentors/:mentorId/:applicationStatus",
      validationMiddleware(MentorApplicationVerificationReqDTO),
      adminMentorController.mentorApplicationVerification.bind(
        adminMentorController
      )
    );
    this._router.patch(
      "/mentors/:mentorId",
      validationMiddleware(UpdateMentorStatusReqDTO),
      adminMentorController.updateMentorStatus.bind(adminMentorController)
    );

    //domain
    this._router.post(
      "/domains",
      upload.array("image", 5),
      formDataParserFormatter,
      validationMiddleware(CreateDomainReqDTO),
      adminDomainController.addDomain.bind(adminDomainController)
    );
    this._router.patch(
      "/domains/:domainId",
      upload.array("image", 5),
      formDataParserFormatter,
      validationMiddleware(EditDomainReqDTO),
      adminDomainController.editDomain.bind(adminDomainController)
    );
    this._router.get(
      "/domains",
      validationMiddleware(GetAllDomainsForAdminReqDTO),
      adminDomainController.getAllDomains.bind(adminDomainController)
    );
    this._router.get(
      "/domains/:domainId",
      validationMiddleware(GetDomainForAdminReqDTO),
      adminDomainController.getDomain.bind(adminDomainController)
    );
    this._router.patch(
      "/domains/:domainId/status",
      validationMiddleware(UpdateDomainStatusDTO),
      adminDomainController.updateDomainStatus.bind(adminDomainController)
    );

    //level
    this._router.patch(
      "/levels/:levelId/status",
      validationMiddleware(UpdateLevelStatusDTO),
      adminLevelController.updateLevelStatus.bind(adminLevelController)
    );

    //community
    this._router.get(
      "/communities",
      validationMiddleware(GetCommunitiesForAdminReqDTO),
      adminCommunityController.getAllCommunities.bind(adminCommunityController)
    );
    this._router.patch(
      "/communities/:communityId",
      validationMiddleware(UpdateCommunityStatusDTO),
      adminCommunityController.updateCommunityStatus.bind(
        adminCommunityController
      )
    );
  }

  getRouter(): Router {
    return this._router;
  }
}
