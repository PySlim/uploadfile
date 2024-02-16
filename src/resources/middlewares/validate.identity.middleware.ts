import { NextFunction, Request, Response } from "express";
import { ConstantsResponse } from "../../constants/constants";
import jwt from 'jsonwebtoken';
import { getEnvVar } from "../../utils/database/conection/get.var.env";
import {userInterfaceData} from "../../app/users/model/users.object.models";
import ExpressReviewsError from "../../utils/error/expressReviewError";

declare global {
    namespace Express {
        interface Request {
            email?: string,
            name?: string,
            id?: string
        }
    }
}
export function ValidateIdentityMiddleware() {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const token: string | undefined = req.headers['authorization']?.split(" ")[1] || "";
            if (!token) throw new ExpressReviewsError('Token is invalid', ConstantsResponse.UNAUTHORIZED, "Validation Error", 'Middleware Authentications');
            const payload = jwt.verify(token, getEnvVar('SECRET_PASS')) as userInterfaceData;
            req.email = payload.email;
            req.name = payload.name;
            req.id = payload.id.toString();
            next()
        } catch (error) {
            throw new ExpressReviewsError("Token invalid.", ConstantsResponse.UNAUTHORIZED, 'Middleware Error');
        }
    }
};
