"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidation = void 0;
const zod_1 = require("zod");
const createAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.enum(['admin']).default('admin'),
        phoneNumber: zod_1.z.string({
            required_error: 'PhoneNumber is required',
        }),
        address: zod_1.z.string({
            required_error: 'Address is required',
        }),
        password: zod_1.z.string({
            required_error: 'password is required',
        }),
        name: zod_1.z.object({
            firstName: zod_1.z.string(),
            lastName: zod_1.z.string().optional(),
        })
    }),
});
const updateAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z
            .string({
            required_error: 'role is required',
        })
            .optional(),
        phoneNumber: zod_1.z
            .string({
            required_error: 'PhoneNumber is required',
        })
            .optional(),
        address: zod_1.z
            .string({
            required_error: 'Address is required',
        })
            .optional(),
        name: zod_1.z
            .object({
            firstName: zod_1.z.string(),
            lastName: zod_1.z.string().optional(),
        })
            .optional(),
    }),
});
exports.AdminValidation = {
    createAdminZodSchema,
    updateAdminZodSchema,
};
