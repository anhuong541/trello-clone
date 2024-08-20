"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CreateTaskHandler;
const tslib_1 = require("tslib");
const firebase_func_1 = require("../../../lib/firebase-func");
const utils_1 = require("../../../lib/utils");
function CreateTaskHandler(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const feat = "create task"; // name api
        const taskContent = req.body;
        try {
            const userId = (0, utils_1.readUserIdFromTheCookis)(req);
            if (!taskContent) {
                return res.status(400).json({
                    status: "fail",
                    message: "require task body",
                    feat,
                });
            }
            try {
                yield (0, firebase_func_1.createOrSetTask)(userId, taskContent.projectId, taskContent.taskId, taskContent);
                yield (0, firebase_func_1.getUpdateProjectDueTime)(userId, taskContent.projectId);
                return res.status(200).json({ status: "success", feat });
            }
            catch (error) {
                return res.status(400).json({
                    status: "fail",
                    feat,
                    message: "something wrong when create task",
                    error,
                });
            }
        }
        catch (error) {
            return res
                .status(401)
                .json({ status: "fail", feat, message: "Un Authorization" });
        }
    });
}
//# sourceMappingURL=index.js.map