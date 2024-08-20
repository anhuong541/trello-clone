import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { getUserDataById } from "../../../lib/firebase-func";
import { generateUidByString } from "../../../lib/utils";
import config from "./../../../config";

export default async function TakeUserInfoHandler(req: Request, res: Response) {
  const feat = "user-info";

  try {
    const token = req?.headers.authorization?.split(" ")[1] ?? ""; // send at the server
    const { email } = jwt.verify(token, config.jwtSecret) as { email: string };
    const userId = generateUidByString(email);

    try {
      const data = await getUserDataById(userId);
      return res.status(200).json({
        status: "success",
        message: "get user data success",
        feat,
        data,
      });
    } catch (error) {
      return res.status(404).json({
        status: "fail",
        message: "missing userId or something",
        feat,
        error,
      });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ status: "fail", feat, message: "Un Authorization" });
  }
}
