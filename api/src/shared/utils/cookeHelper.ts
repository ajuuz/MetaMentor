import { Response } from "express";
import { config } from "shared/config";

export const setCookie = (
  res: Response,
  accessToken: string,
  refreshToken: string
) => {
  const isProduction = config.node_env === "production";
  console.log("isProduction",isProduction);
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "none",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "none",
  });
};

export const setAccessCookie = (res: Response, accessToken: string) => {
  const isProduction = config.node_env === "production";
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: isProduction,
  });
};

export const clearCookies = (res: Response) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
};
