import { CustomError } from "domain/errors/customError";

import cookie from "cookie";
import { TokenService } from "infrastructure/service/token.service";
import { JwtPayload } from "jsonwebtoken"; // if using jsonwebtoken
import { ModifiedSocket } from "type/types";



// Middleware type
type SocketMiddleware = (
  socket: ModifiedSocket,
  next: (err?: Error) => void
) => void;

export const socketAuthMiddleware: SocketMiddleware = (socket, next) => {
  try {
    const rawCookie = socket.handshake.headers.cookie;
    if (!rawCookie) {
      throw new CustomError(401, "No cookie found");
    }

    const cookies = cookie.parse(rawCookie);
    const token = cookies.refreshToken;
    if (!token) {
      throw new CustomError(401, "No token provided");
    }

    const decode = new TokenService().verifyRefreshToken(token) as JwtPayload & {
      id: string;
      role: string;
    };

    socket.userId = decode.id;
    next();
  } catch (error) {
    next(error as Error);
  }
};
