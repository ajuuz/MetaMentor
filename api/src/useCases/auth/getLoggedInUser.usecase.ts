// import { ITokenService } from "entities/serviceInterfaces/tokenService.interface";
// import { IGetLoggedInUserUsecase } from "entities/usecaseInterfaces/auth/getLoggedInUserUsecase.interface";
// import { JwtPayload } from "jsonwebtoken";
// import { ERROR_MESSAGE, HTTP_STATUS } from "shared/constants";
// import { AuthError } from "shared/utils/error/authError";
// import { inject, injectable } from "tsyringe";



// @injectable()
// export class GetLoggedInUserUsecase implements IGetLoggedInUserUsecase{

//     constructor(
//         @inject('ITokenService')
//         private _tokenService:ITokenService
//     ){}
//     execute(refreshToken:string):JwtPayload{
//         if(!refreshToken) throw new AuthError(HTTP_STATUS.UNAUTHORIZED,ERROR_MESSAGE.UNAUTHORIZED_ACCESS_NOT_LOGIN);
//         const user:JwtPayload=this._tokenService.verifyRefreshToken(refreshToken)
//         return user
//     }
// }