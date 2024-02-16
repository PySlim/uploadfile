import { z } from "zod";

export const dataErrorSchema = z.object({
    name: z.string(),
    role: z.enum(['admin','user']),
    email: z.string().email(),
    age: z.string(),
    password: z.string().min(8),
    crated: z.date(),
    updated: z.date()
})


type dataErrorType = z.infer<typeof dataErrorSchema>

export interface  dataErrorInterface extends dataErrorType{}

export interface dataErrorInterfaceData extends  dataErrorType{
    id: number
}
