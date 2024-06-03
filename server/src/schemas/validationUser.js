import { z } from "zod";

export const createSchema = z.object({
  UserName: z
    .string({
      required_error: "Username required",
    })
    .min(3)
    .max(100),
  Password: z
    .string({
      required_error: "Password required",
    })
    .min(3)
    .max(100),
});
