import { NextFunction, Request, Response, Router } from "express";
import { upload } from "frameworks/cloudinary/cloudinary";
import {
  authMiddleware,
  commonController,
  commonDomainController,
  fcmTokenController,
} from "frameworks/di/resolver";
import { ROLES } from "shared/constants";

interface MulterRequest extends Request {
  files: Express.Multer.File[];
}

export class CommonRoutes {
  private _router: Router;

  constructor() {
    this._router = Router();
    this.configureRoutes();
  }

  configureRoutes(): void {
    this._router.post(
      "/images/upload",
      authMiddleware.verifyAuth.bind(authMiddleware),
      authMiddleware.blockChecker.bind(authMiddleware),
      upload.array("image", 5),
      (req: Request, res: Response, next: NextFunction) => {
        commonController.uploadImage(req as MulterRequest, res, next);
      }
    );

    this._router.get(
      "/eventSource/:email",
      commonController.eventSource.bind(commonController)
    );

    this._router.post(
      "/fcmTokens",
      authMiddleware.verifyAuth.bind(authMiddleware),
      authMiddleware.verifyAuthRole([ROLES.MENTOR, ROLES.ADMIN, ROLES.USER]),
      authMiddleware.blockChecker.bind(authMiddleware),
      fcmTokenController.saveFcmToken.bind(fcmTokenController)
    );

    this._router.get(
      "/domains",
      authMiddleware.verifyAuth.bind(authMiddleware),
      commonDomainController.getDomainNamesAndId.bind(commonDomainController)
    );
  }

  getRouter(): Router {
    return this._router;
  }
}
