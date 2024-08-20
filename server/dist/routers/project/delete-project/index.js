"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DeleteProjectHandler;
const tslib_1 = require("tslib");
const firebase_func_1 = require("../../../lib/firebase-func");
const utils_1 = require("../../../lib/utils");
function DeleteProjectHandler(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const feat = "delete project";
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
            yield (0, utils_1.checkUIDAndProjectExists)(userId, projectId, feat, res);
            try {
                yield (0, firebase_func_1.deteleProject)(userId, projectId);
                return res.status(200).json({
                    status: "success",
                    message: "delete project complete",
                    feat,
                });
            }
            catch (error) {
                return res.status(404).json({
                    status: "fail",
                    message: "something wrong when delete project",
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