"use strict";
/* eslint-disable no-console */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const cows_model_1 = require("../COWS/cows.model");
const user_model_1 = require("../users/user.model");
const order_model_1 = require("./order.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const createOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log(payload, 'from order ');
    const { cow, buyer } = payload;
    // Check if the user has enough money in their account to buy the cow
    const buyerData = yield user_model_1.User.findOne({ _id: buyer });
    const cowData = yield cows_model_1.Cows.findOne({ _id: cow });
    payload.seller = cowData.seller;
    // console.log(cowData, 'cow and ', buyerData);
    if (!cowData) {
        new ApiError_1.default(400, 'Could not find the Cow');
    }
    else if (!buyerData) {
        new ApiError_1.default(400, 'Could not find the Buyer');
    }
    const cowPrice = cowData.price;
    const buyerBudget = buyerData.budget;
    if (cowPrice > buyerBudget) {
        new ApiError_1.default(400, 'Failed to create new User');
    }
    const sessionMongoose = yield mongoose_1.default.startSession();
    sessionMongoose.startTransaction();
    try {
        yield cows_model_1.Cows.updateOne({ _id: cow }, { label: 'sold out' }, { sessionMongoose });
        yield user_model_1.User.updateOne({ _id: buyer }, { $inc: { budget: -cowPrice } }, { sessionMongoose });
        yield user_model_1.User.updateOne({ _id: buyer }, { $inc: { income: cowPrice } }, { sessionMongoose });
        const order = yield order_model_1.Orders.create(payload);
        yield sessionMongoose.commitTransaction();
        return order;
    }
    catch (error) {
        yield sessionMongoose.abortTransaction();
        throw error;
    }
    finally {
        sessionMongoose.endSession();
    }
    //   const result = await Orders.create(payload);
    //   return result;
});
const getSingleOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Orders.findById(id);
    return {
        cow: result
    };
});
exports.OrderService = {
    createOrder,
    getSingleOrder
};
