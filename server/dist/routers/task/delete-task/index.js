"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DeleteTaskHandler;
const tslib_1 = require("tslib");
const utils_1 = require("../../../lib/utils");
const firebase_func_1 = require("../../../lib/firebase-func");
function DeleteTaskHandler(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const feat = "delete task";
        const taskContent = req.params;
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
                yield (0, firebase_func_1.deteleTask)(userId, taskContent.projectId, taskContent.taskId);
                yield (0, firebase_func_1.getUpdateProjectDueTime)(userId, taskContent.projectId);
                return res.status(200).json({ status: "success", feat });
            }
            catch (error) {
                return res.status(400).json({
                    status: "fail",
                    feat,
                    message: "something wrong when delete task",
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