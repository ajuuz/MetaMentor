import { Router } from "express";
import { upload } from "infrastructure/config/cloudinary/cloudinary.config";
import {
  adminCommunityController,
  adminDomainController,
  adminLevelController,
  adminMentorController,
  adminStudentController,
  authMiddleware,
} from "frameworks/di/resolver";
import { formDataParserFormatter } from "interfaceAdapters/middlewares/imageFormatter.middleware";
import { validationMiddleware } from "interfaceAdapters/middlewares/validation.middleware";
import { ROLES } from "shared/constants";
import {
  GetCommunitiesForAdminReqDTO,
  UpdateCommunityStatusDTO,
} from "shared/dto/request/community.dto";
import {
  CreateDomainReqDTO,
  EditDomainReqDTO,
  GetAllDomainsForAdminReqDTO,
  GetDomainForAdminReqDTO,
  UpdateDomainStatusDTO,
} from "shared/dto/request/domain.dto";
import { UpdateLevelStatusDTO } from "shared/dto/request/level.dto";
import {
  GetAllMentorsReqDTO,
  GetSpecificMentorReqDTO,
  MentorApplicationVerificationReqDTO,
  UpdateMentorStatusReqDTO,
} from "shared/dto/request/mentor.dto";
import {
  GetAllStudentReqDTO,
  UpdateStudentStatusReqDTO,
} from "shared/dto/request/student.dto";

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
