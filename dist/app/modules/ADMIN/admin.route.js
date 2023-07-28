"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateUserRequest_1 = __importDefault(require("../../middlesWare/validateUserRequest"));
const admin_validation_1 = require("./admin.validation");
const auth_validation_1 = require("../AUTH/auth.validation");
const auth_controller_1 = require("../AUTH/auth.controller");
const admin_controller_1 = require("./admin.controller");
const router = express_1.default.Router();
router.post('/create-admin', (0, validateUserRequest_1.default)(admin_validation_1.AdminValidation.createAdminZodSchema), admin_controller_1.adminController.createAdmin);
router.post('/login', (0, validateUserRequest_1.default)(auth_validation_1.AuthValidation.createUserZodSchema), auth_controller_1.authController.loginController);
// router.get("/",userController.getUser)
exports.AdminRouter = router;
