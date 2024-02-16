import { z } from "zod";

export const dataErrorSchemaResponse = z.object({
    name: z.string().nullish(),
    role: z.enum(['admin','user']).nullish(),
    email: z.string().email().nullish(),
    age: z.string().nullish(),
    password: z.string().min(8).nullish()
})
