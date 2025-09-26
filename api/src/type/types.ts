import { Request } from "express";
import { ROLES } from "shared/constants";
import { Socket } from "socket.io";

export interface ModifiedRequest extends Request {
  user: {
    id: string;
    role: ROLES;
  };
}


export interface ModifiedSocket extends Socket{
  userId?:string,
  roomId?:string,
  userName?:string
}