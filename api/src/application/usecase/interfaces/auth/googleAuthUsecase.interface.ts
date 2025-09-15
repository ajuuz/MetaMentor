import { LoginResDTO } from "shared/dto/response/auth.dto";

export interface IGoogleAuthUsecase {
  execute(idToken: string): Promise<{
    userData: LoginResDTO;
    accessToken: string;
    refreshToken: string;
  }>;
}
