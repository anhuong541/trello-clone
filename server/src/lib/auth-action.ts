import { NextFunction, Request, Response } from "express";
import config from "../config";
import jwt from "jsonwebtoken";

export const sendUserSession = async (res: Response, token: string) => {
  await res.cookie("user_session", token, {
    httpOnly: true, // for deploy only
    secure: config.env,
    maxAge: 2 * 60 * 60 * 1000, // two hours
    path: "/",
  });
};

export const authorizationMidleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const feat = "check authorization";
  const token = req?.cookies.user_session ?? "";
  try {
    jwt.verify(token, config.jwtSecret);
    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ status: "fail", feat, message: "Un Authorization" });
  }
};
