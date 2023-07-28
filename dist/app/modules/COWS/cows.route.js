"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowsRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateUserRequest_1 = __importDefault(require("../../middlesWare/validateUserRequest"));
const cows_controller_1 = require("./cows.controller");
const cows_validation_1 = require("./cows.validation");
const auth_1 = __importDefault(require("../../middlesWare/auth"));
const router = express_1.default.Router();
router.post('/', (0, validateUserRequest_1.default)(cows_validation_1.CowValidation.createCowZodSchema), (0, auth_1.default)("seller" /* ENUM_USER_ROLE.SELLER */), cows_controller_1.CowController.createCow);
router.get('/:id', (0, auth_1.default)("seller" /* ENUM_USER_ROLE.SELLER */, "buyer" /* ENUM_USER_ROLE.BUYER */, "admin" /* ENUM_USER_ROLE.ADMIN */), cows_controller_1.CowController.getSingleCow);
router.get('/', (0, auth_1.default)("seller" /* ENUM_USER_ROLE.SELLER */, "buyer" /* ENUM_USER_ROLE.BUYER */, "admin" /* ENUM_USER_ROLE.ADMIN */), cows_controller_1.CowController.getALLCow);
router.delete('/:id', (0, auth_1.default)("seller" /* ENUM_USER_ROLE.SELLER */), cows_controller_1.CowController.deleteCow);
router.patch('/:id', (0, validateUserRequest_1.default)(cows_validation_1.CowValidation.updateCowZodSchema), (0, auth_1.default)("seller" /* ENUM_USER_ROLE.SELLER */), cows_controller_1.CowController.updateCow);
exports.CowsRouter = router;
