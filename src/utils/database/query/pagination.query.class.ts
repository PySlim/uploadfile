import { ConstantsModule, ConstantsResponse } from "../../../constants/constants";
import { query } from "../../../database/database";
import ExpressReviewsError from "../../error/expressReviewError";

class PaginationQuery {

    public table: string;
    private chain: string = '';
    public url: string = '';
    private sortField: string = '';
    private limit: number = 0;
    private page : number = 0;
    private desc: boolean = false;

    constructor(table: string) {
        this.table = table;
    };

    async exec(fields: string, queryParams: Record<string, any>, validateFieldOrder: string[], url: string) {
        try {
            this.url= url
            const part = this.divideObject(queryParams);
            this.Select(fields);
            this.Where(part[1]);
            const dataPagination = await this.DataPagination(part[0]);
            this.Pagination(part[0], validateFieldOrder);
            const result = await query(this.chain);
            const queryResult = result.rows
            return {queryResult, dataPagination };
        } catch (error) {
            throw new ExpressReviewsError("Error en la inserción de la data",
                ConstantsResponse.INTERNAL_SERVER_ERROR, "Error Class Query", "Metodo pagination", error);
        }
    }

    private divideObject(data: Record<string, any>): [{ limit: string; page: string; desc: string; sort: string; }, any] {
        const paginacionParams = { limit: '', page: '', desc: '', sort: '' };
        const otrosParams: { [key: string]: string } = {};

        for (const key in data) {
            if (paginacionParams.hasOwnProperty(key)) {
                paginacionParams[key as keyof typeof paginacionParams] = data[key];
            } else {
                otrosParams[key] = data[key];
            }
        }
        return [paginacionParams, otrosParams];
    }

    private Select(fields: string) {
        this.chain = `SELECT ${fields} FROM ${this.table} `
        return this
    }

    private Where(where: Record<string, any>) {
        where['status']=true
        let placeholders: string[] = [];
        for (const [clave, valor] of Object.entries(where)) {
            placeholders.push(`${clave} = '${valor}'`);
        }
        this.chain = `${this.chain} WHERE ${placeholders.join(' AND ')} `
        return this
    }

    private Pagination(
        params: { limit: string; page: string; desc: string; sort: string; },
        camposOrdenacionPermitidos: string[]) {
        this.limit = parseInt(params.limit, 10);
        this.page = parseInt(params.page, 10);
        this.desc = params.desc === "true";
        this.sortField = params.sort;
        // Comprueba si el campo de ordenación es válido
        if (!camposOrdenacionPermitidos.includes(this.sortField)) {
            this.sortField = "id"; // Valor predeterminado si el campo de ordenación no es válido
        }
        // Calcula el offset
        const offset = (this.page - 1) * this.limit;
        // Construye la consulta
        this.chain = `${this.chain} ORDER BY ${this.sortField} ${this.desc ? 'DESC' : 'ASC'} LIMIT ${this.limit} OFFSET ${offset}`;
        return this;
    }

    private async DataPagination(data: { limit: string; page: string; desc: string; sort: string; }){
        try {
            const result = await query(this.chain);
            const next = `${ConstantsModule.PROTOCOL}${ConstantsModule.SERVER_HOST}:${ConstantsModule.PORT}${this.url}?limit=${data.limit}&page=${Number(data.page)+1}&desc=${data.desc === 'true' ? 'true' : 'false'}&sort=${data.sort}`;
            const prev = `${ConstantsModule.PROTOCOL}${ConstantsModule.SERVER_HOST}:${ConstantsModule.PORT}${this.url}?limit=${data.limit}&page=${Number(data.page)-1}&desc=${data.desc === 'true' ? 'true' : 'false'}&sort=${data.sort}`;
            const count = Number(result.rowCount);
            const numberPage = (count / Number(data.limit)) < 1 ? 1 : (count / Number(data.limit));
            const response = {
                count: count,
                next : Number(data.page) === numberPage ? null : next,
                previous: Number(data.page) === 1 ? null : prev,
            }
            return response
        } catch (error) {
            throw new ExpressReviewsError("Error en la inserción de la data",
                ConstantsResponse.INTERNAL_SERVER_ERROR, "Error Class Query", "Metodo pagination", error);
        }
    }
};



export default PaginationQuery;
