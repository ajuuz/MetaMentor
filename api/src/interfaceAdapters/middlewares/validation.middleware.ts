import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "shared/constants";

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
      errors.forEach((err) => {
        console.log(err.children);
      });
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
