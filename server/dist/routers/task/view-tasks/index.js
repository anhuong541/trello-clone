"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ViewTasksHandler;
const tslib_1 = require("tslib");
const firebase_func_1 = require("../../../lib/firebase-func");
const utils_1 = require("../../../lib/utils");
function ViewTasksHandler(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const feat = "view all tasks"; // name api
        try {
            const userId = (0, utils_1.readUserIdFromTheCookis)(req);
            const { projectId } = req.params;
            if (!projectId) {
                return res.status(404).json({
                    status: "fail",
                    message: "missing userId or projectId",
                    feat,
                });
            }
            if (!(yield (0, firebase_func_1.checkProjectExists)(userId, projectId))) {
                return res
                    .status(409)
                    .json({ status: "fail", error: "project doesn't exists!", feat });
            }
            try {
                const data = yield (0, firebase_func_1.viewTasksProject)(userId, projectId);
                return res.status(200).json({ status: "success", feat, data });
            }
            catch (error) {
                return res.status(400).json({
                    status: "fail",
                    feat,
                    message: "something wrong when viewing task",
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