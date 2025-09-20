import { LoginResDTO } from "application/dto/response/auth.dto";

export interface ILoginUsecase {
  execute(
    email: string,
    password: string
  ): Promise<{
    userData: LoginResDTO;
    accessToken: string;
    refreshToken: string;
  }>;
}
