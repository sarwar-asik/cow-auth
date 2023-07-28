import { z } from 'zod';

const createAdminZodSchema = z.object({
  body: z.object({
    role: z.enum(['admin']).default('admin'),
    phoneNumber: z.string({
      required_error: 'PhoneNumber is required',
    }),
    address: z.string({
      required_error: 'Address is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
    name: z.object({
      firstName: z.string(),
      lastName: z.string().optional(),
    })
  }),
});

const updateAdminZodSchema = z.object({
  body: z.object({
    role: z
      .string({
        required_error: 'role is required',
      })
      .optional(),
    phoneNumber: z
      .string({
        required_error: 'PhoneNumber is required',
      })
      .optional(),
    address: z
      .string({
        required_error: 'Address is required',
      })
      .optional(),
    name: z
      .object({
        firstName: z.string(),
        lastName: z.string().optional(),
      })
      .optional(),
  }),
});

export const AdminValidation = {
  createAdminZodSchema,
  updateAdminZodSchema,
};