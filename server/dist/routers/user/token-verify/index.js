"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TokenVerifyHandler;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const config_1 = tslib_1.__importDefault(require("../../../config"));
const utils_1 = require("../../../lib/utils");
const firebase_func_1 = require("../../../lib/firebase-func");
function TokenVerifyHandler(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const feat = "token verify";
        const jwtToken = (_b = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) !== null && _b !== void 0 ? _b : "";
        try {
            const checkJwt = jsonwebtoken_1.default.verify(jwtToken, config_1.default.jwtSecret);
            const userId = (0, utils_1.generateUidByString)(checkJwt === null || checkJwt === void 0 ? void 0 : checkJwt.email);
            const checkUserIsActive = yield (0, firebase_func_1.checkUserAccountIsActive)(userId);
            if (!checkUserIsActive) {
                return res
                    .status(403)
                    .json({ status: "error", feat, message: "user didn't active" });
            }
            return res.status(200).json({ status: "success", feat, checkJwt });
        }
        catch (error) {
            return res
                .status(401)
                .json({ status: "error", feat, message: "token is expire" });
        }
    });
}
//# sourceMappingURL=index.js.map