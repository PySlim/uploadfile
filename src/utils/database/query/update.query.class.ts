import { ConstantsResponse } from "../../../constants/constants";
import { query } from "../../../database/database";
import ExpressReviewsError from "../../error/expressReviewError";

class UpdateQuery {
    id: string | number = 0;
    body: Record<string, any> = {};
    table: string;

    constructor(table: string) {
        this.table = table;
    }

    async exec(id: string | number, body: Record<string, any>) {
        try {
            if (Object.keys(body).length === 0)throw new Error('Body Where Not found.');
            this.id = id;
            this.body = body;
            let queryString = `UPDATE ${this.table} SET `;
            const params: any[] = [];
            let index = 1;

            for (const [campo, valor] of Object.entries(this.body)) {
                if (index > 1) queryString += ', ';
                queryString += `${campo} = $${index}`;
                params.push(valor);
                index++;
            }

            params.push(this.id);
            queryString += ` WHERE ID = $${index} AND STATUS=TRUE RETURNING *;`;
            const result = await query(queryString, params);
            return result.rows[0];
        } catch (error) {
            throw new ExpressReviewsError("Error en la actualización de la data",
                ConstantsResponse.INTERNAL_SERVER_ERROR, "Error Class Query", "Metodo Update", error);
        }
    }
};

export default UpdateQuery;
