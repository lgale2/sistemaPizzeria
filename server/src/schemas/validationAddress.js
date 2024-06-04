import { z } from "zod";

export const createSchema = z.object({
    Address: z
        .string({
            required_error: "Address required",
        })
        .min(3)
        .max(100),
});
