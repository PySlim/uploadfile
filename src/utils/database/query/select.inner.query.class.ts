import {query} from "../../../database/database";
import ExpressReviewsError from "../../error/expressReviewError";
import {ConstantsResponse} from "../../../constants/constants";

class SelectInnerQueryClass{
    table: string;

    constructor(table: string){
        this.table = table;
    }



    async exec(fields: string, inner: string, onA: string, onB: string, where: Record<string, any>){
        try {
            let queryString = `SELECT ${fields} FROM ${this.table} A `;
            let placeholders: string[] = [];

            for (const [clave, valor] of Object.entries(where)) {
                placeholders.push(`A.${clave} = '${valor}'`);
            }
            const result = await query(`${queryString} INNER JOIN ${inner} B ON A.${onA}=B.${onB} WHERE ${placeholders.join(' AND ')} ;`);
            return result.rows

        } catch (error) {
            throw new ExpressReviewsError("Error en la solicitud de data",
                ConstantsResponse.UNPROCESSABLE_ENTITY, "Error Class Query", "Metodo Select", error);
        }
    }
}

export default  SelectInnerQueryClass;
