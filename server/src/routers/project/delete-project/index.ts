import { Request, Response } from "express";
import { deteleProject } from "../../../lib/firebase-func";
import {
  checkUIDAndProjectExists,
  readUserIdFromTheCookis,
} from "../../../lib/utils";

export default async function DeleteProjectHandler(
  req: Request<{ projectId: string }>,
  res: Response
) {
  const feat = "delete project";
  try {
    const userId = readUserIdFromTheCookis(req) as string;
    const { projectId } = req.params;
    if (!projectId) {
      return res.status(404).json({
        status: "fail",
        message: "missing userId or projectId",
        feat,
      });
    }

    await checkUIDAndProjectExists(userId, projectId, feat, res);

    try {
      await deteleProject(userId, projectId);
      return res.status(200).json({
        status: "success",
        message: "delete project complete",
        feat,
      });
    } catch (error) {
      return res.status(404).json({
        status: "fail",
        message: "something wrong when delete project",
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
