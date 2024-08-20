import { Request, Response } from "express";
import { TaskType } from "../../../types";
import {
  createOrSetTask,
  getUpdateProjectDueTime,
} from "../../../lib/firebase-func";
import { readUserIdFromTheCookis } from "../../../lib/utils";

export default async function UpdateTaskHandler(
  req: Request<{}, {}, TaskType, {}>,
  res: Response
) {
  const feat = "update task";
  const taskContent = req.body;
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
      await createOrSetTask(
        userId,
        taskContent.projectId,
        taskContent.taskId,
        taskContent
      );
      await getUpdateProjectDueTime(userId, taskContent.projectId);
      return res.status(200).json({ status: "success", feat });
    } catch (error) {
      return res.status(400).json({
        status: "fail",
        feat,
        message: "something wrong when update task",
        error,
      });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ status: "fail", feat, message: "Un Authorization" });
  }
}
