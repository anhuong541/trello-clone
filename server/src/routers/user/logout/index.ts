import { Request, Response } from "express";

export default async function LogoutRouteHandler(req: Request, res: Response) {
  const feat = "logout";
  res.clearCookie("user_session");
  return res.status(200).json({ status: "success", feat });
}
