"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TakeUserInfoHandler;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const firebase_func_1 = require("../../../lib/firebase-func");
const utils_1 = require("../../../lib/utils");
const config_1 = tslib_1.__importDefault(require("./../../../config"));
function TakeUserInfoHandler(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const feat = "user-info";
        try {
            const token = (_b = (_a = req === null || req === void 0 ? void 0 : req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) !== null && _b !== void 0 ? _b : ""; // send at the server
            const { email } = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
            const userId = (0, utils_1.generateUidByString)(email);
            try {
                const data = yield (0, firebase_func_1.getUserDataById)(userId);
                return res.status(200).json({
                    status: "success",
                    message: "get user data success",
                    feat,
                    data,
                });
            }
            catch (error) {
                return res.status(404).json({
                    status: "fail",
                    message: "missing userId or something",
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