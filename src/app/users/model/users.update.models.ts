import { z } from "zod";


export const userSchemaUpdate = z.object({
    name: z.string().min(2).optional(),
    role: z.string().min(2).optional(),
    email: z.string().email().optional(),
    age: z.number().int(),
    password: z.string().min(8).optional()
})


type userSchemaUpdateType = z.infer<typeof userSchemaUpdate>

export interface userInterfaceUpdate extends userSchemaUpdateType{}
