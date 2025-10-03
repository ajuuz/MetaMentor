import { NextFunction, Request, Response } from "express";

interface MulterRequest extends Request {
  files: Express.Multer.File[];
}

export const formDataParserFormatter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const files: Express.Multer.File[] = (req as MulterRequest).files;
  req.body.images = files.map((file: any) => file.filename);
  for (const key in req.body) {
    req.body[key] = parseValue(req.body[key]);
  }
  next();
};

function parseValue(value: any) {
  if (typeof value !== "string") return value;

  if (value === "true") return true;
  if (value === "false") return false;

  if (!isNaN(Number(value))) return Number(value);

  try {
    const parsed = JSON.parse(value);
    if (typeof parsed === "object") return parsed;
  } catch {}

  return value;
}
