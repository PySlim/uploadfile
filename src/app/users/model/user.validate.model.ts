import { z } from "zod";

export const userValidateSchema = z.object({
    name: z.string().min(2),
    role: z.enum(['admin','user']),
    email: z.string().email(),
    age: z.string().transform((value) => {
            const parsed = parseInt(value, 10);
            if (isNaN(parsed)) {
                throw new Error("Age must be a valid number");
            }
            return parsed;
        }).or(z.number()),
    password: z.string().min(8),
    status: z.boolean({
        required_error: "Status is required.",
        invalid_type_error: "Status should be a valid boolean."
    }).optional().transform(()=>true),
    created: z.string().optional().default(new Date().toISOString()),
    updated: z.string().optional().default(new Date().toISOString())
})
