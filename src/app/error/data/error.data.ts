import {ErrorDataInterface} from "./error.data.interface";
import MainQuery from "../../../utils/database/query/main.query.class";
import {NextFunction} from "express";
import ExpressReviewsError from "../../../utils/error/expressReviewError";
import {ConstantsResponse} from "../../../constants/constants";

class ErrorData implements  ErrorDataInterface{
    dataSet: MainQuery = new MainQuery('ERROR');
    async Create(data: Object, next: NextFunction): Promise<any> {
       try {
           return await this.dataSet.insert.exec(data);
       } catch (error) {
           if (error instanceof ExpressReviewsError) next(error)
           next(new ExpressReviewsError("Failed to create error data.",
                   ConstantsResponse.INTERNAL_SERVER_ERROR, "DataError", "Data.create", error));
       }
    }

}

export default new ErrorData();
