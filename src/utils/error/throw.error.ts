import ExpressReviewsError from "./expressReviewError";
import {NextFunction} from "express";

export function ThrowErrorHandler(error: ExpressReviewsError, next: NextFunction){
    next(error)
}
