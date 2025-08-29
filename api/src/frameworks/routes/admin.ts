import { Router } from "express";
import {
  adminCommunityController,
  adminDomainController,
  adminMentorController,
  adminStudentController,
  authMiddleware,
} from "frameworks/di/resolver";
import { validationMiddleware } from "interfaceAdapters/middlewares/validation.middleware";
import { ROLES } from "shared/constants";
import { GetCommunitiesForAdminReqDTO, UpdateCommunityStatusDTO } from "shared/dto/request/community.dto";
import { CreateDomainReqDTO, GetAllDomainsForAdminReqDTO, UpdateDomainStatusDTO } from "shared/dto/request/domain.dto";
import { GetAllMentorsReqDTO, GetSpecificMentorReqDTO, MentorApplicationVerificationReqDTO, UpdateMentorStatusReqDTO } from "shared/dto/request/mentor.dto";
import { GetAllStudentReqDTO, UpdateStudentStatusReqDTO } from "shared/dto/request/student.dto";

export class AdminRoutes {
  private _router: Router;

  constructor() {
    this._router = Router();
    this.configureRoutes();
  }

  private configureRoutes(): void {
    //student
    this._router.get(
      "/students",
      authMiddleware.verifyAuth.bind(authMiddleware),
      authMiddleware.verifyAuthRole([ROLES.ADMIN]),
      validationMiddleware(GetAllStudentReqDTO),
      adminStudentController.getAllStudents.bind(adminStudentController)
    );
    this._router.patch(
      "/students/:userId",
      authMiddleware.verifyAuth.bind(authMiddleware),
      authMiddleware.verifyAuthRole([ROLES.ADMIN]),
      validationMiddleware(UpdateStudentStatusReqDTO),
      adminStudentController.updateStudentStatus.bind(adminStudentController)
    );

    //mentor
    this._router.get(
      "/mentors",
      authMiddleware.verifyAuth.bind(authMiddleware),
      authMiddleware.verifyAuthRole([ROLES.ADMIN]),
      validationMiddleware(GetAllMentorsReqDTO),
      adminMentorController.getAllMentors.bind(adminMentorController)
    );
    this._router.get(
      "/mentors/:mentorId",
      authMiddleware.verifyAuth.bind(authMiddleware),
      authMiddleware.verifyAuthRole([ROLES.ADMIN]),
      validationMiddleware(GetSpecificMentorReqDTO),
      adminMentorController.getSpecificMentor.bind(adminMentorController)
    );
    this._router.patch(
      "/mentors/:mentorId/:applicationStatus",
      authMiddleware.verifyAuth.bind(authMiddleware),
      authMiddleware.verifyAuthRole([ROLES.ADMIN]),
      validationMiddleware(MentorApplicationVerificationReqDTO),
      adminMentorController.mentorApplicationVerification.bind(
        adminMentorController
      )
    );
    this._router.patch(
      "/mentors/:mentorId",
      authMiddleware.verifyAuth.bind(authMiddleware),
      authMiddleware.verifyAuthRole([ROLES.ADMIN]),
      validationMiddleware(UpdateMentorStatusReqDTO),
      adminMentorController.updateMentorStatus.bind(adminMentorController)
    );

    //domain
    this._router.post(
      "/domains",
      authMiddleware.verifyAuth.bind(authMiddleware),
      authMiddleware.verifyAuthRole([ROLES.ADMIN]),
      validationMiddleware(CreateDomainReqDTO),
      adminDomainController.addDomain.bind(adminDomainController)
    );
    this._router.get(
      "/domains",
      authMiddleware.verifyAuth.bind(authMiddleware),
      authMiddleware.verifyAuthRole([ROLES.ADMIN]),
      validationMiddleware(GetAllDomainsForAdminReqDTO),
      adminDomainController.getAllDomains.bind(adminDomainController)
    );
    this._router.patch(
      "/domains/:domainId",
      authMiddleware.verifyAuth.bind(authMiddleware),
      authMiddleware.verifyAuthRole([ROLES.ADMIN]),
      validationMiddleware(UpdateDomainStatusDTO),
      adminDomainController.updateDomainStatus.bind(adminDomainController)
    );
    
    //community
    this._router.get(
      "/communities",
      authMiddleware.verifyAuth.bind(authMiddleware),
      authMiddleware.verifyAuthRole([ROLES.ADMIN]),
      validationMiddleware(GetCommunitiesForAdminReqDTO),
      adminCommunityController.getAllCommunities.bind(adminCommunityController)
    );
    this._router.patch(
      "/communities/:communityId",
      authMiddleware.verifyAuth.bind(authMiddleware),
      authMiddleware.verifyAuthRole([ROLES.ADMIN]),
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
