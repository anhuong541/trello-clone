"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AddProjectHandler;
const tslib_1 = require("tslib");
const firebase_func_1 = require("../../../lib/firebase-func");
const utils_1 = require("../../../lib/utils");
function AddProjectHandler(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const feat = "add project";
        const projectContent = req.body;
        try {
            const userId = (0, utils_1.readUserIdFromTheCookis)(req);
            if (!projectContent) {
                return res.status(500).json({
                    status: "fail",
                    message: "require project name and userId !!!",
                    feat,
                });
            }
            const projectId = (0, utils_1.generateNewUid)();
            const dataProject = Object.assign(Object.assign({}, projectContent), { projectId, dueTime: Date.now() });
            if (!(yield (0, firebase_func_1.checkEmailUIDExists)(userId))) {
                return res.status(409).json({
                    status: "fail",
                    error: "user doesn't exists!",
                    feat,
                });
            }
            try {
                yield (0, firebase_func_1.createOrSetProject)(userId, projectId, dataProject);
                return res.status(200).json({
                    status: "success",
                    message: "Create new project successfull",
                    projectId,
                    feat,
                });
            }
            catch (error) {
                return res.status(400).json({
                    status: "fail",
                    message: "something wrong when add new project",
                    feat,
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