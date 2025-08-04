import { HTTP_STATUS } from "shared/constants";

import { CustomError } from "./customError";

export class ValidationError extends CustomError {
  constructor(message:string='Necessary Credential Not recieved') {
    super(HTTP_STATUS.BAD_REQUEST,message);
    this.name = "ValidationError";
  }
}
