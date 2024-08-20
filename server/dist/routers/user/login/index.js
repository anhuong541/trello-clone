"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LoginRouteHandler;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const utils_1 = require("../../../lib/utils");
const firebase_func_1 = require("../../../lib/firebase-func");
const config_1 = tslib_1.__importDefault(require("../../../config"));
const auth_action_1 = require("./../../../lib/auth-action");
const checkPasswordIsCorrect = (userId, password) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const dataUser = yield (0, firebase_func_1.getUserDataById)(userId);
    if ((dataUser === null || dataUser === void 0 ? void 0 : dataUser.password) === password)
        return true;
    return false;
});
function LoginRouteHandler(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const feat = "login";
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(500).json({
                status: "fail",
                message: "require email and password !!!",
                feat,
            });
        }
        const userId = (0, utils_1.generateUidByString)(email);
        const checkEmail = yield (0, firebase_func_1.checkEmailUIDExists)(userId);
        if (!checkEmail) {
            return res
                .status(404)
                .json({ status: "fail", error: "email doesn't exists!", feat });
        }
        const checkPassword = yield checkPasswordIsCorrect(userId, password);
        if (!checkPassword) {
            return res
                .status(401)
                .json({ status: "fail", error: "your password is wrong", feat });
        }
        const checkUserIsActive = yield (0, firebase_func_1.checkUserAccountIsActive)(userId);
        if (!checkUserIsActive) {
            return res.status(403).json({
                status: "fail",
                error: "Check your email to active your account first!",
                feat,
            });
        }
        const token = jsonwebtoken_1.default.sign({ email, password }, config_1.default.jwtSecret, {
            expiresIn: "12h",
        });
        // send auth cookie at frontend code
        (0, auth_action_1.sendUserSession)(res, token);
        return res.status(200).json({ status: "success", token, feat });
    });
}
//# sourceMappingURL=index.js.map