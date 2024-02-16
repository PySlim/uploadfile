import { ConstantsResponse } from "../../../constants/constants";
import { query } from "../../../database/database";
import ExpressReviewsError from "../../error/expressReviewError";

class InsertQuery{
    body: Record<string, any> = {};
    table: string ;

    constructor(tabla: string){
        this.table= tabla
    };

    async exec( body:Record<string, any>){
        try {
            this.body=body;
            const columns = Object.keys(this.body);
            const placeholders = columns.map((_, index) => `$${index + 1}`);
            const values = columns.map((column) => this.body[column]);
            const queryString = `INSERT INTO ${this.table} (${columns.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING *;`;
            const result =  await query(queryString, values);
            return result.rows[0];
        } catch (error) {
            throw new ExpressReviewsError("Error en la inserción de la data",
                ConstantsResponse.INTERNAL_SERVER_ERROR, "Error Class Query", "Metodo Insert", error);
        }
    };
}

export default InsertQuery;
