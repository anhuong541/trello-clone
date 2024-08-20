import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { generateUidByString } from "../../../lib/utils";
import {
  checkEmailUIDExists,
  checkUserAccountIsActive,
  getUserDataById,
} from "../../../lib/firebase-func";
import config from "../../../config";
import { sendUserSession } from "./../../../lib/auth-action";

const checkPasswordIsCorrect = async (userId: string, password: string) => {
  const dataUser = await getUserDataById(userId);
  if (dataUser?.password === password) return true;
  return false;
};

export default async function LoginRouteHandler(req: Request, res: Response) {
  const feat = "login";
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(500).json({
      status: "fail",
      message: "require email and password !!!",
      feat,
    });
  }

  const userId = generateUidByString(email);
  const checkEmail = await checkEmailUIDExists(userId);

  if (!checkEmail) {
    return res
      .status(404)
      .json({ status: "fail", error: "email doesn't exists!", feat });
  }

  const checkPassword = await checkPasswordIsCorrect(userId, password);
  if (!checkPassword) {
    return res
      .status(401)
      .json({ status: "fail", error: "your password is wrong", feat });
  }

  const checkUserIsActive = await checkUserAccountIsActive(userId);

  if (!checkUserIsActive) {
    return res.status(403).json({
      status: "fail",
      error: "Check your email to active your account first!",
      feat,
    });
  }

  const token = jwt.sign({ email, password }, config.jwtSecret, {
    expiresIn: "12h",
  });

  // send auth cookie at frontend code
  sendUserSession(res, token);

  return res.status(200).json({ status: "success", token, feat });
}
