"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouter = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const auth_1 = __importDefault(require("../../middlesWare/auth"));
const orders_validation_1 = require("./orders.validation");
const validateUserRequest_1 = __importDefault(require("../../middlesWare/validateUserRequest"));
const order_auth_1 = __importDefault(require("./order.auth"));
// import authOrder from './order.auth';
const router = express_1.default.Router();
router.post('/', (0, validateUserRequest_1.default)(orders_validation_1.OrderValidation.createOrderZodSchema), (0, auth_1.default)("buyer" /* ENUM_USER_ROLE.BUYER */), order_controller_1.createOrder);
// created  a new middleWare for get Specify order 
router.get('/:id', (0, order_auth_1.default)("admin" /* ENUM_USER_ROLE.ADMIN */), order_controller_1.getSingleOrder);
router.get('/', (0, order_auth_1.default)("admin" /* ENUM_USER_ROLE.ADMIN */), order_controller_1.getALLOrder);
// router.get('/:id',auth("buyer"), getSingleOrderController);
exports.OrderRouter = router;
