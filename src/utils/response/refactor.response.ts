import {NextFunction} from "express";
import {Schema} from "zod";
import ExpressReviewsError from "../error/expressReviewError";
import {ConstantsResponse} from "../../constants/constants";


export function RefactorResponse(schema: Schema, dataObjct: Object | Object[], message: string, next: NextFunction, pagination?: Object):Object | any{
    try {
        let parsedData;

        if (Array.isArray(dataObjct)) {
            parsedData = dataObjct.map(obj => schema.parse(obj));
        } else {
            parsedData = [schema.parse(dataObjct)];
        }
        return {
            ok: true,
            message: message,
            data: parsedData,
            pagination: pagination ? pagination : {}
        };

    } catch (error) {
        next(new ExpressReviewsError('Error en el parseo de la respuesta', ConstantsResponse.INTERNAL_SERVER_ERROR,'ParserError','sin detalles',error));
    }
}
