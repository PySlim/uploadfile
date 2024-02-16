import { z } from "zod";

export const DocumentSchemaResponse = z.object({
    id: z.number(),
    name: z.string(),
    url: z.string()
})

type documentResponseType = z.infer<typeof DocumentSchemaResponse>

export interface  documentInterfaceResponse extends  documentResponseType{}

