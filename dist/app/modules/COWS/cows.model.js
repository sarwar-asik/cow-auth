"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cows = void 0;
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const mongoose_1 = require("mongoose");
const cows_const_1 = require("./cows.const");
const CowSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    price: { type: Number, required: true },
    location: { type: String, enum: cows_const_1.cowLocation, required: true },
    breed: { type: String, enum: cows_const_1.cowBreed, required: true },
    weight: { type: Number, required: true },
    label: { type: String, enum: cows_const_1.cowLabel, default: 'for sale' },
    category: {
        type: String,
        enum: cows_const_1.cowCategories,
        required: true,
    },
    seller: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Cows = (0, mongoose_1.model)('Cow', CowSchema);
