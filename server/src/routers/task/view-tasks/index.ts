import { Request, Response } from "express";
import {
  checkProjectExists,
  viewTasksProject,
} from "../../../lib/firebase-func";
import { readUserIdFromTheCookis } from "../../../lib/utils";

export default async function ViewTasksHandler(
  req: Request<{ projectId: string }>,
  res: Response
) {
  const feat = "view all tasks"; // name api
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

    if (!(await checkProjectExists(userId, projectId))) {
      return res
        .status(409)
        .json({ status: "fail", error: "project doesn't exists!", feat });
    }

    try {
      const data = await viewTasksProject(userId, projectId);
      return res.status(200).json({ status: "success", feat, data });
    } catch (error) {
      return res.status(400).json({
        status: "fail",
        feat,
        message: "something wrong when viewing task",
        error,
      });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ status: "fail", feat, message: "Un Authorization" });
  }
}
