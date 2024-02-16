import { z } from "zod";

export const userSchemaLogin = z.object({
    email: z.string({
        required_error: "email is required.",
        invalid_type_error: "email should be a valid string of at least two characters."
    }).email().transform((value)=>value.toUpperCase().trim()),
    password: z.string({
        required_error: "Password is required.",
        invalid_type_error: "Password should be a valid string of at least two characters."
    }).min(8)
})

type userSchemaLoginType = z.infer<typeof userSchemaLogin>

export interface userInterfaceLogin extends  userSchemaLoginType{}
