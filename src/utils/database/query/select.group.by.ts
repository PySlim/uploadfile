import {query} from "../../../database/database";
import ExpressReviewsError from "../../error/expressReviewError";
import {ConstantsResponse} from "../../../constants/constants";

class SelectGroupBy{
    table: string;

    constructor(table: string){
        this.table = table;
    }



    async exec(fields: string, where: Record<string, any>, groupBy: string){
        try {
            let queryString = `SELECT ${fields} FROM ${this.table} `;
            where['status']=true;
            let placeholders: string[] = [];

            for (const [clave, valor] of Object.entries(where)) {
                placeholders.push(`${clave} = '${valor}'`);
            }

            const result = await query(`${queryString} WHERE ${placeholders.join(' AND ')} GROUP BY ${groupBy};`);
            return result.rows

        } catch (error) {
            throw new ExpressReviewsError("Error en la solicitud de data",
                ConstantsResponse.UNPROCESSABLE_ENTITY, "Error Class Query", "Metodo Select", error);
        }
    }
}

export  default  SelectGroupBy;
