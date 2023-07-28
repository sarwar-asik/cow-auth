import { z } from 'zod';

const createOrderZodSchema = z.object({
  body: z.object({
    cow: z.string({
      required_error: 'Cow _id is required',
    }),
    buyer: z.string({
      required_error: ' buyer _id is required',
    }),
  }),
});

export const OrderValidation = { createOrderZodSchema };
