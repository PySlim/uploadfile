import { NextFunction, Request, Response } from "express";
import { ConstantsModule } from "../../constants/constants";

declare global {
    namespace Express {
        interface Request {
            pagination?: boolean,
            pagination_result ?: Object,
        }
    }
}

export function PaginateMiddleware() {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const defaultValues = {
                limit: ConstantsModule.LIMIT_PAGINATION,
                page: '1',
                desc: 'false',
                sort: '',
            } as Record<string, string>;

            for (const key in defaultValues) {
                if (req.query[key] === undefined) {
                    req.query[key] = defaultValues[key];
                } else {
                    if (key === 'limit' || key === 'page') {
                        const parsedInt = parseInt(req.query[key] as string, 10);
                        req.query[key] = !isNaN(parsedInt) ? parsedInt.toString() : defaultValues[key];
                    } else if (key === 'desc') {
                        const value = (req.query[key] as string).toLowerCase();
                        if (value !== 'true' && value !== 'false') {
                            req.query[key] = defaultValues[key];
                        }
                    }
                }
            };

            req.pagination_result = {}

            next();
        } catch (error) {
            next(error);
        }
    };
}

