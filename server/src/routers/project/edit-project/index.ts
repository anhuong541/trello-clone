import { Request, Response } from "express";
import { createOrSetProject } from "../../../lib/firebase-func";
import { ProjectType } from "../../../types";
import {
  checkUIDAndProjectExists,
  readUserIdFromTheCookis,
} from "../../../lib/utils";

export default async function EditProjectHandler(
  req: Request<{}, {}, ProjectType, {}>,
  res: Response
) {
  const feat = "edit project";
  let projectContent = req.body;

  try {
    const userId = readUserIdFromTheCookis(req) as string;

    if (!projectContent) {
      return res.status(404).json({
        status: "fail",
        message: "your project name is missing",
        feat,
      });
    }

    await checkUIDAndProjectExists(userId, projectContent.projectId, feat, res);

    const dataInput = {
      ...projectContent,
      dueTime: Date.now(),
    };

    try {
      await createOrSetProject(userId, projectContent.projectId, dataInput);
      return res.status(200).json({
        status: "success",
        feat,
      });
    } catch (error) {
      return res.status(400).json({
        status: "fail",
        message: "something wrong!!!",
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
