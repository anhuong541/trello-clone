"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationMidleware = exports.sendUserSession = void 0;
const tslib_1 = require("tslib");
const config_1 = tslib_1.__importDefault(require("../config"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const sendUserSession = (res, token) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield res.cookie("user_session", token, {
        httpOnly: true, // for deploy only
        secure: config_1.default.env,
        maxAge: 2 * 60 * 60 * 1000, // two hours
        path: "/",
    });
});
exports.sendUserSession = sendUserSession;
const authorizationMidleware = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const feat = "check authorization";
    const token = (_a = req === null || req === void 0 ? void 0 : req.cookies.user_session) !== null && _a !== void 0 ? _a : "";
    try {
        jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
        return next();
    }
    catch (error) {
        return res
            .status(401)
            .json({ status: "fail", feat, message: "Un Authorization" });
    }
});
exports.authorizationMidleware = authorizationMidleware;
//# sourceMappingURL=auth-action.js.map