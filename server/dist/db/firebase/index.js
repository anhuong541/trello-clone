"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firestoreDB = exports.auth = void 0;
const tslib_1 = require("tslib");
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth");
const firestore_1 = require("firebase/firestore");
const config_1 = tslib_1.__importDefault(require("../../config"));
const firebaseConfig = {
    apiKey: config_1.default.apiKey,
    authDomain: config_1.default.authDomain,
    projectId: config_1.default.projectId,
    storageBucket: config_1.default.storageBucket,
    messagingSenderId: config_1.default.messagingSenderId,
    appId: config_1.default.appId,
    measurementId: config_1.default.measurementId,
};
const firebaseApp = (0, app_1.initializeApp)(firebaseConfig);
exports.auth = (0, auth_1.getAuth)(firebaseApp);
exports.firestoreDB = (0, firestore_1.getFirestore)(firebaseApp);
//# sourceMappingURL=index.js.map