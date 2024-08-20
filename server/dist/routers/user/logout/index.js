"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LogoutRouteHandler;
const tslib_1 = require("tslib");
function LogoutRouteHandler(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const feat = "logout";
        res.clearCookie("user_session");
        return res.status(200).json({ status: "success", feat });
    });
}
//# sourceMappingURL=index.js.map