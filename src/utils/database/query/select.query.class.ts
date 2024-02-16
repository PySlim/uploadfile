import { ConstantsResponse } from "../../../constants/constants";
import { query } from "../../../database/database";
import ExpressReviewsError from "../../error/expressReviewError";

class SelectQuery{

    table: string;

    constructor(table: string){
        this.table=table;
    }

    async exec(fields?: string){
        try {
            if(fields){
                const result = await query(`SELECT ${fields} FROM ${this.table} ;`);
                return result.rows
            }else{
                const result = await query(`SELECT * FROM ${this.table} ;`);
                return result.rows
            }
        } catch (error) {
            throw new ExpressReviewsError("Error en la solicitud de data",
                ConstantsResponse.INTERNAL_SERVER_ERROR, "Error Class Query", "Metodo Select", error);
        }
    }
};

export default SelectQuery;
