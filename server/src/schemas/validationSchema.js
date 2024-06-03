import { z } from "zod";

export const createSchema = z.object({
  Name: z
    .string({
      required_error: "Name required",
    })
    .min(3)
    .max(100),
  Price: z.number({
    required_error: "Price required",
    invalid_type_error: "The price must be a number",
  }),
  Unit: z.number({
    required_error: "Unit required",
    invalid_type_error: "The unit must be a number",
  }),
  Tax: z.number({
    required_error: "Tax required",
    invalid_type_error: "The tax must be a number",
  })
});
