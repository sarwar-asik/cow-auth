import { z } from 'zod';
import { cowBreed, cowCategories, cowLabel, cowLocation } from './cows.const';

const createCowZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Cow name is required',
    }),
    age: z.number(),
    price: z.number(),
    location: z.enum([...cowLocation] as [string, ...string[]], {
      required_error: `Required location .send ${cowLocation}`,
    }),
    breed: z.enum([...cowBreed] as [string, ...string[]], {
      required_error: `Required breed .send ${cowBreed}`,
    }),
    weight: z.number(),
    label: z.enum([...cowLabel] as [string, ...string[]], {
      required_error: `Required label .send ${cowLabel}`,
    }),
    category: z.enum([...cowCategories] as [string, ...string[]], {
      required_error: `Required Categories .send ${cowCategories}`,
    }),
    seller: z.string(),
  }),
});

const updateCowZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Cow name is required',
      })
      .optional(),
    age: z.number().optional(),
    price: z.number().optional(),
    location: z
      .enum([...cowLocation] as [string, ...string[]], {
        required_error: `Required location .send ${cowLocation}`,
      })
      .optional(),
    breed: z
      .enum([...cowBreed] as [string, ...string[]], {
        required_error: `Required breed .send ${cowBreed}`,
      })
      .optional(),
    weight: z.number().optional(),
    label: z
      .enum([...cowLabel] as [string, ...string[]], {
        required_error: `Required label .send ${cowLabel}`,
      })
      .optional(),
    category: z
      .enum([...cowCategories] as [string, ...string[]], {
        required_error: `Required Categories .send ${cowCategories}`,
      })
      .optional(),
    seller: z.string().optional(),
  }),
});

export const CowValidation = { createCowZodSchema, updateCowZodSchema };
