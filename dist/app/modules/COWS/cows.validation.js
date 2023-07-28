"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowValidation = void 0;
const zod_1 = require("zod");
const cows_const_1 = require("./cows.const");
const createCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Cow name is required',
        }),
        age: zod_1.z.number(),
        price: zod_1.z.number(),
        location: zod_1.z.enum([...cows_const_1.cowLocation], {
            required_error: `Required location .send ${cows_const_1.cowLocation}`,
        }),
        breed: zod_1.z.enum([...cows_const_1.cowBreed], {
            required_error: `Required breed .send ${cows_const_1.cowBreed}`,
        }),
        weight: zod_1.z.number(),
        label: zod_1.z.enum([...cows_const_1.cowLabel], {
            required_error: `Required label .send ${cows_const_1.cowLabel}`,
        }),
        category: zod_1.z.enum([...cows_const_1.cowCategories], {
            required_error: `Required Categories .send ${cows_const_1.cowCategories}`,
        }),
        seller: zod_1.z.string(),
    }),
});
const updateCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: 'Cow name is required',
        })
            .optional(),
        age: zod_1.z.number().optional(),
        price: zod_1.z.number().optional(),
        location: zod_1.z
            .enum([...cows_const_1.cowLocation], {
            required_error: `Required location .send ${cows_const_1.cowLocation}`,
        })
            .optional(),
        breed: zod_1.z
            .enum([...cows_const_1.cowBreed], {
            required_error: `Required breed .send ${cows_const_1.cowBreed}`,
        })
            .optional(),
        weight: zod_1.z.number().optional(),
        label: zod_1.z
            .enum([...cows_const_1.cowLabel], {
            required_error: `Required label .send ${cows_const_1.cowLabel}`,
        })
            .optional(),
        category: zod_1.z
            .enum([...cows_const_1.cowCategories], {
            required_error: `Required Categories .send ${cows_const_1.cowCategories}`,
        })
            .optional(),
        seller: zod_1.z.string().optional(),
    }),
});
exports.CowValidation = { createCowZodSchema, updateCowZodSchema };
