import {query} from "../../../database/database";
import ExpressReviewsError from "../../error/expressReviewError";
import {ConstantsResponse} from "../../../constants/constants";

class SelectInQueryClass{
    table: string;

    constructor(table: string){
        this.table = table;
    }

    async exec(fields: string, where: string, params: string){
        try {
            let queryString = `SELECT ${fields} FROM ${this.table} `;

            const result = await query(`${queryString} WHERE ${where} In ${params};`);
            return result.rows

        } catch (error) {
            throw new ExpressReviewsError("Error en la solicitud de data",
                ConstantsResponse.UNPROCESSABLE_ENTITY, "Error Class Query", "Metodo Select", error);
        }
    }
}

export default  SelectInQueryClass;
