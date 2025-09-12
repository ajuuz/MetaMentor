import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "shared/constants";

function flattenValidationErrors(
  errors: ValidationError[],
  parentPath = ""
): { property: string; constraints: Record<string, string> }[] {
  return errors.flatMap((error) => {
    const path = parentPath
      ? `${parentPath}.${error.property}`
      : error.property;

    const currentErrors = error.constraints
      ? [{ property: path, constraints: error.constraints }]
      : [];

    const childErrors = error.children
      ? flattenValidationErrors(error.children, path)
      : [];

    return [...currentErrors, ...childErrors];
  });
}

export const validationMiddleware = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const params = req.params;
    const query = req.query;
    let data: any = {};
    if (body && Object.keys(body).length > 0) {
      data = { ...data, ...body };
    }

    if (params && Object.keys(params).length > 0) {
      data = { ...data, ...params };
    }

    if (query && Object.keys(query).length > 0) {
      data = { ...data, ...query };
    }

    const dtoObj = plainToInstance(dtoClass, data);
    const errors = await validate(dtoObj, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      const detailedErrors = flattenValidationErrors(errors);
      console.log(detailedErrors);
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Validation failed",
        errors: errors.map((err) => ({
          property: err.property,
          constraints: err.constraints,
        })),
      });
      return;
    }

    req.verifiedData = dtoObj;
    next();
  };
};
