"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RegisterRouteHandler;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const crypto_1 = tslib_1.__importDefault(require("crypto"));
const firebase_func_1 = require("../../../lib/firebase-func");
const auth_action_1 = require("./../../../lib/auth-action");
const utils_1 = require("../../../lib/utils");
const email_action_1 = require("./../../../lib/email-action");
const config_1 = tslib_1.__importDefault(require("../../../config"));
function RegisterRouteHandler(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const feat = "register";
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            res.status(500);
            throw Error("require email and password !!!");
        }
        const userId = (0, utils_1.generateUidByString)(email);
        const checkEmail = yield (0, firebase_func_1.checkEmailUIDExists)(userId);
        if (checkEmail) {
            return res
                .status(409)
                .json({ status: "fail", error: "email have been used!", feat });
        }
        const token = jsonwebtoken_1.default.sign({ email, password }, config_1.default.jwtSecret, {
            expiresIn: "12h",
        });
        const activationHash = crypto_1.default.randomBytes(20).toString("hex");
        const dataRegister = {
            uid: userId,
            username,
            email,
            password,
            createAt: Date.now(),
            activationHash,
            isActive: false,
        };
        // send auth cookie at frontend code when call api at server side in nextjs
        yield (0, auth_action_1.sendUserSession)(res, token);
        const defaultMsgCon = {
            from: {
                name: "Mailer active bot",
                address: config_1.default.emailApp,
            },
            to: [email],
            subject: "Email active account Trello",
            text: `This is an active email`,
            html: `<div>Please activate your account by clicking the link: <a href="${"http://localhost:3456"}/user/${email}/${activationHash}">${"http://localhost:3000"}/user/${email}/${activationHash}</a></div>`,
        };
        yield (0, email_action_1.sendMail)(defaultMsgCon);
        try {
            yield (0, firebase_func_1.createNewUser)(userId, dataRegister);
            return res.status(200).json({ status: "success", token, feat });
        }
        catch (error) {
            return res.status(400).json({
                status: "fail",
                message: "something wrong when register new user",
                feat,
                error,
            });
        }
    });
}
//# sourceMappingURL=index.js.map