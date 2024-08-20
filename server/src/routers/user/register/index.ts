import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { checkEmailUIDExists, createNewUser } from "../../../lib/firebase-func";
import { sendUserSession } from "./../../../lib/auth-action";
import { generateUidByString } from "../../../lib/utils";
import { sendMail } from "./../../../lib/email-action";
import config from "../../../config";

export default async function RegisterRouteHandler(
  req: Request,
  res: Response
) {
  const feat = "register";
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    res.status(500);
    throw Error("require email and password !!!");
  }

  const userId = generateUidByString(email);
  const checkEmail = await checkEmailUIDExists(userId);

  if (checkEmail) {
    return res
      .status(409)
      .json({ status: "fail", error: "email have been used!", feat });
  }

  const token = jwt.sign({ email, password }, config.jwtSecret, {
    expiresIn: "12h",
  });
  const activationHash = crypto.randomBytes(20).toString("hex");

  const dataRegister = {
    uid: userId,
    username,
    email,
    password,
    createAt: Date.now(),
    activationHash,
    isActive: false,
  };

  // send auth cookie at frontend code when call api at server side in nextjs
  await sendUserSession(res, token);

  const defaultMsgCon = {
    from: {
      name: "Mailer active bot",
      address: config.emailApp,
    },
    to: [email],
    subject: "Email active account Trello",
    text: `This is an active email`,
    html: `<div>Please activate your account by clicking the link: <a href="${"http://localhost:3456"}/user/${email}/${activationHash}">${"http://localhost:3000"}/user/${email}/${activationHash}</a></div>`,
  };

  await sendMail(defaultMsgCon);

  try {
    await createNewUser(userId, dataRegister);
    return res.status(200).json({ status: "success", token, feat });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: "something wrong when register new user",
      feat,
      error,
    });
  }
}
