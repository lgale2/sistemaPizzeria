import { z } from "zod";

export const createSchema = z.object({
    Name: z
        .string({
            required_error: "Name required",
        })
        .min(3)
        .max(100),
});
