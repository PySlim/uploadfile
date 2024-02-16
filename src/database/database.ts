import { Pool } from 'pg';
import { Env } from './database.interface';
import { getEnvVar } from '../utils/database/conection/get.var.env';
import ExpressReviewsError from '../utils/error/expressReviewError';
import { ConstantsResponse } from '../constants/constants';

const valuesDatabase: Env={
    host: getEnvVar('DB_HOST'),
    port: parseInt(getEnvVar('DB_PORT')),
    database: getEnvVar('DB_NAME'),
    user: getEnvVar('DB_USER'),
    password: getEnvVar('DB_PASS'),
}

export const pool = new Pool(
    valuesDatabase
);


pool.on('error', (err) => {
    throw new ExpressReviewsError('Error Data Base',ConstantsResponse.INTERNAL_SERVER_ERROR,'error pg');
});


export const query = (text:string, params?:string[])=>{
    return pool.query(text, params);
};
