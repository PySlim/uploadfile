import { z } from "zod";


export const userSchemaResponse = z.object({
    id: z.number().int(),
    name: z.string(),
    rol: z.string().nullish(),
    email: z.string().nullish(),
    age: z.number().int(),
    token: z.string().optional()
})


type userSchemaResponseType = z.infer<typeof userSchemaResponse>

export interface userInterfaceResponse extends userSchemaResponseType{}
