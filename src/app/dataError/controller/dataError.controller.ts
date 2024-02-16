import {DataErrorControllerInterface} from "./dataError.controller.interface";
import {NextFunction, Request , Response} from "express";
import DataErrorService from "../service/dataError.service";
//import {RefactorResponse} from "../../../utils/response/refactor.response";
import {ConstantsResponse} from "../../../constants/constants";
import ExpressReviewsError from "../../../utils/error/expressReviewError";
//import {dataErrorSchemaResponse} from "../model/dataError.response.model";

class DataErrorController implements  DataErrorControllerInterface{
     async Update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
             const dataError = await DataErrorService.Update(req, next);
             if(!dataError) return
             //const response = RefactorResponse(dataErrorSchemaResponse,dataError,'  successfully',next);
             res.status(ConstantsResponse.OK).json(dataError);
        } catch (error) {
             if (error instanceof ExpressReviewsError) next(error)
             next(new ExpressReviewsError("Failed to   dataError", ConstantsResponse.INTERNAL_SERVER_ERROR, "ControllerError",'dataErrorController.' ,error));
        }
    }

}

export default new DataErrorController()
