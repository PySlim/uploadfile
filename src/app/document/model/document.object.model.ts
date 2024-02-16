import { z } from "zod";


export const documentSchema = z.object({
    name: z.string(),
    url: z.string(),
    status: z.boolean({
        required_error: "Status is required.",
        invalid_type_error: "Status should be a valid boolean."
    }).optional().transform(()=>true),
    created: z.string().optional().default(new Date().toISOString()),
    updated: z.string().optional().default(new Date().toISOString())
})

type documentType = z.infer<typeof documentSchema>

export interface  documentInterface extends  documentType{}
export interface documentInterfaceData extends  documentType{
    id: number
}

export const documentValidateField: string[] = ['name']
