import { Request, Response } from "express";
import { readUserIdFromTheCookis } from "../../../lib/utils";
import {
  deteleTask,
  getUpdateProjectDueTime,
} from "../../../lib/firebase-func";

export default async function DeleteTaskHandler(req: Request, res: Response) {
  const feat = "delete task";
  const taskContent = req.params;
  try {
    const userId = readUserIdFromTheCookis(req) as string;

    if (!taskContent) {
      return res.status(400).json({
        status: "fail",
        message: "require task body",
        feat,
      });
    }

    try {
      await deteleTask(userId, taskContent.projectId, taskContent.taskId);
      await getUpdateProjectDueTime(userId, taskContent.projectId);
      return res.status(200).json({ status: "success", feat });
    } catch (error) {
      return res.status(400).json({
        status: "fail",
        feat,
        message: "something wrong when delete task",
        error,
      });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ status: "fail", feat, message: "Un Authorization" });
  }
}
