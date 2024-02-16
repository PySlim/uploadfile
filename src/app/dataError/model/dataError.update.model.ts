import { z } from "zod";

export const dataErrorSchemaUpdate = z.object({
    name: z.string().optional(),
    role: z.enum(['admin','user']).optional(),
    email: z.string().email().optional(),
    age: z.string().or(z.number()).optional(),
    password: z.string().min(8).optional()
})

type dataErrorTypeUpdate = z.infer<typeof dataErrorSchemaUpdate>

export interface dataErrorInterfaceUpdate extends dataErrorTypeUpdate{}
