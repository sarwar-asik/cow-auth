"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleOrder = exports.getALLOrder = exports.createOrder = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const order_services_1 = require("./order.services");
const sendResponce_1 = __importDefault(require("../../../shared/sendResponce"));
const order_model_1 = require("./order.model");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const http_status_1 = __importDefault(require("http-status"));
const cows_model_1 = require("../COWS/cows.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
exports.createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const OrderData = __rest(req.body, []);
    const result = yield order_services_1.OrderService.createOrder(OrderData);
    (0, sendResponce_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Order created successfully!',
        data: result,
    });
}));
exports.getALLOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const id = req.params.id;
    const token = req.headers.authorization;
    if (!token) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, `You are not authorized`);
    }
    const verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    console.log(verifiedUser);
    let data = null;
    // let query ={}
    if ((verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.role) === 'admin') {
        data = yield order_model_1.Orders.find({});
    }
    if ((verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.role) === 'buyer') {
        data = yield order_model_1.Orders.find({ buyer: verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser._id })
            .populate('buyer')
            .populate('seller');
    }
    if ((verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.role) === 'seller') {
        const CowsData = yield cows_model_1.Cows.findOne({ seller: verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser._id });
        if (CowsData) {
            data = yield order_model_1.Orders.find({ cow: CowsData === null || CowsData === void 0 ? void 0 : CowsData._id })
                .populate('buyer')
                .populate('seller');
        }
    }
    (0, sendResponce_1.default)(res, {
        success: true,
        message: 'successfully fetched Order',
        statusCode: http_status_1.default.FOUND,
        data: data,
    });
}));
exports.getSingleOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const token = req.headers.authorization;
    if (!token) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, `You are not authorized`);
    }
    const verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    console.log(verifiedUser);
    let data = null;
    // let query ={}
    if ((verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.role) === 'admin') {
        data = yield order_model_1.Orders.find({});
    }
    if ((verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.role) === 'buyer') {
        console.log(id, 'params id');
        data = yield order_model_1.Orders.find({ buyer: verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser._id, _id: id })
            .populate('buyer')
            .populate('seller');
    }
    if ((verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.role) === 'seller') {
        const CowsData = yield cows_model_1.Cows.findOne({ seller: verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser._id });
        if (CowsData) {
            data = yield order_model_1.Orders.find({ _id: id, cow: CowsData === null || CowsData === void 0 ? void 0 : CowsData._id })
                .populate('buyer')
                .populate('seller');
        }
    }
    (0, sendResponce_1.default)(res, {
        success: true,
        message: 'successfully fetched Orders',
        statusCode: http_status_1.default.FOUND,
        data: data,
    });
}));
