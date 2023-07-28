"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const mongoose_1 = require("mongoose");
const OrderSchemas = new mongoose_1.Schema({
    cow: { type: mongoose_1.Schema.Types.ObjectId, ref: 'COw', required: true },
    buyer: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    seller: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Orders = (0, mongoose_1.model)('Order', OrderSchemas);
