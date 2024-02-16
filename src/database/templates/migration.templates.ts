import { Migration } from "../connectors/migrators";

export const up: Migration = async (params) => {
    return params.context.query(`RAISE EXCEPTION 'up migration not implemented'`);
};
export const down: Migration = async (params) => {
    return params.context.query(`RAISE EXCEPTION 'down migration not implemented'`);
};
