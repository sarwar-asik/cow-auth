"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateUserRequest_1 = __importDefault(require("../../middlesWare/validateUserRequest"));
const auth_1 = __importDefault(require("../../middlesWare/auth"));
const user_controller_1 = require("../users/user.controller");
const user_validation_1 = require("../users/user.validation");
const router = express_1.default.Router();
// it is optional
router.get('/:id', (0, auth_1.default)("admin" /* ENUM_USER_ROLE.ADMIN */), user_controller_1.userController.getSingleUser);
router.get('/', (0, auth_1.default)("admin" /* ENUM_USER_ROLE.ADMIN */), user_controller_1.userController.getALLUser);
router.delete('/:id', (0, auth_1.default)("admin" /* ENUM_USER_ROLE.ADMIN */), user_controller_1.userController.deleteUser);
router.patch('/:id', (0, validateUserRequest_1.default)(user_validation_1.UserValidation.updateUserZodSchema), user_controller_1.userController.updateUser);
exports.UserRouter = router;
