"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = sendMail;
const tslib_1 = require("tslib");
const config_1 = tslib_1.__importDefault(require("../config"));
const nodemailer_1 = tslib_1.__importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: config_1.default.emailApp,
        pass: config_1.default.passApp,
    },
});
const defaultMsgCon = {
    from: {
        name: "Trello clone bot",
        address: config_1.default.emailApp,
    },
    to: ["nguyenxuananhuong541@gmail.com"],
    subject: "Hello World",
    text: "this is the default message :> ",
    html: "<b>Hello World</b>",
};
function sendMail(msgConfig) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const info = yield transporter.sendMail(msgConfig !== null && msgConfig !== void 0 ? msgConfig : defaultMsgCon);
            console.log("Message sent: %s", info.messageId);
            // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
        }
        catch (error) {
            console.log("error sending email: ", error);
        }
    });
}
//# sourceMappingURL=email-action.js.map