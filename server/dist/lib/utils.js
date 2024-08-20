"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readUserIdFromTheCookis = exports.checkUIDAndProjectExists = exports.generateUidByString = exports.generateNewUid = void 0;
const tslib_1 = require("tslib");
const uuid_1 = require("uuid");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const crypto_1 = tslib_1.__importDefault(require("crypto"));
const firebase_func_1 = require("./firebase-func");
const config_1 = tslib_1.__importDefault(require("../config"));
const generateNewUid = () => {
    return (0, uuid_1.v4)();
};
exports.generateNewUid = generateNewUid;
const generateUidByString = (inputString) => {
    const hash = crypto_1.default.createHash("sha256");
    hash.update(inputString);
    const uid = hash.digest("hex");
    return uid.slice(0, 35);
};
exports.generateUidByString = generateUidByString;
const checkUIDAndProjectExists = (userId, projectId, feat, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (!(yield (0, firebase_func_1.checkEmailUIDExists)(userId))) {
        return res
            .status(409)
            .json({ status: "fail", error: "user doesn't exists!", feat });
    }
    if (!(yield (0, firebase_func_1.checkProjectExists)(userId, projectId))) {
        return res
            .status(409)
            .json({ status: "fail", error: "project doesn't exists!", feat });
    }
    return null;
});
exports.checkUIDAndProjectExists = checkUIDAndProjectExists;
const readUserIdFromTheCookis = (req) => {
    var _a;
    const token = (_a = req === null || req === void 0 ? void 0 : req.cookies.user_session) !== null && _a !== void 0 ? _a : ""; // send at the client
    const { email } = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
    return (0, exports.generateUidByString)(email);
};
exports.readUserIdFromTheCookis = readUserIdFromTheCookis;
//# sourceMappingURL=utils.js.map