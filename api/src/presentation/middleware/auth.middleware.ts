import { AuthError } from "domain/errors/authError";
import { IMentorRepository } from "domain/repositoryInterfaces/mentorRepository.interface";
import { IStudentRepository } from "domain/repositoryInterfaces/student-repository.interface";

import { IAuthMiddleware } from "application/interfaces/middleware/authMiddleware.interface";
import { ITokenService } from "application/interfaces/service/tokenService.interface";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { ERROR_MESSAGE, HTTP_STATUS, ROLES } from "shared/constants";
import { clearCookies } from "shared/utils/cookeHelper";
import { inject, injectable } from "tsyringe";
import { ModifiedRequest } from "type/types";

@injectable()
export class AuthMiddleware implements IAuthMiddleware {
  constructor(
    @inject("ITokenService")
    private _tokenService: ITokenService,

    @inject("IMentorRepository")
    private _mentorRepository: IMentorRepository,

    @inject("IStudentRepository")
    private _studentRepository: IStudentRepository
  ) {}

  verifyAuth(req: Request, res: Response, next: NextFunction): void {
    const accessToken = req.cookies.accessToken;
    try {
      if (!accessToken) {
        throw new AuthError(
          HTTP_STATUS.UNAUTHORIZED,
          ERROR_MESSAGE.UNAUTHORIZED_ACCESS_NOT_LOGIN
        );
      }

      const user: JwtPayload =
        this._tokenService.verifyAccessToken(accessToken);
      (req as ModifiedRequest).user = {
        id: user.id,
        role: user.role,
      };
      next();
    } catch (error) {
      next(error);
    }
  }

  verifyAuthRole(
    authorizedRole: ROLES[]
  ): (req: Request, res: Response, next: NextFunction) => void {
    return (req: Request, res: Response, next: NextFunction): void => {
      const { role } = (req as ModifiedRequest).user;
      if (!authorizedRole.includes(role)) {
        throw new AuthError(
          HTTP_STATUS.UNAUTHORIZED,
          ERROR_MESSAGE.UNAUTHORIZED_ACCESS
        );
      }
      next();
    };
  }

  private async _checkStatus(
    id: string,
    role: ROLES.MENTOR | ROLES.USER
  ): Promise<boolean> {
    const repo = {
      mentor: this._mentorRepository,
      user: this._studentRepository,
    }[role];
    const user = await repo.getStatus(id);
    if (!user) throw new AuthError(HTTP_STATUS.NOT_FOUND, "User not found");

    return user.isBlocked;
  }

  async blockChecker(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const modReq = req as ModifiedRequest;
    if (!modReq.user)
      throw new AuthError(
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_MESSAGE.UNAUTHORIZED_ACCESS_NOT_LOGIN
      );

    const role = modReq.user.role;
    const userId = modReq.user.id;
    if (role === ROLES.ADMIN) {
      next();
      return;
    }
    const status = await this._checkStatus(
      userId,
      role as ROLES.MENTOR | ROLES.USER
    );
    if (status) {
      clearCookies(res);
      throw new AuthError(HTTP_STATUS.FORBIDDEN, ERROR_MESSAGE.BLOCKED_ERROR);
    }

    next();
  }
}
