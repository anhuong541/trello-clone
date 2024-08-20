"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditProjectHandler = exports.ProjectListHandler = exports.DeleteProjectHandler = exports.AddProjectHandler = void 0;
const tslib_1 = require("tslib");
const add_project_1 = tslib_1.__importDefault(require("./add-project"));
exports.AddProjectHandler = add_project_1.default;
const delete_project_1 = tslib_1.__importDefault(require("./delete-project"));
exports.DeleteProjectHandler = delete_project_1.default;
const project_list_1 = tslib_1.__importDefault(require("./project-list"));
exports.ProjectListHandler = project_list_1.default;
const edit_project_1 = tslib_1.__importDefault(require("./edit-project"));
exports.EditProjectHandler = edit_project_1.default;
//# sourceMappingURL=index.js.map