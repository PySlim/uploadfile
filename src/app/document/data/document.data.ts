import {DocumentDataInterface} from "./document.data.interface";
import MainQuery from "../../../utils/database/query/main.query.class";
import {NextFunction} from "express";
import ExpressReviewsError from "../../../utils/error/expressReviewError";
import {ConstantsResponse} from "../../../constants/constants";
import {documentValidateField} from "../model/document.object.model";



class DocumentData implements DocumentDataInterface{
    dataSet: MainQuery = new MainQuery('DOCUMENT');
    async Create(data: Object, next: NextFunction): Promise<any> {
        try {
            return await this.dataSet.insert.exec(data);
        } catch (error) {
            if (error instanceof ExpressReviewsError) next(error)
            next(new ExpressReviewsError("Failed to create document.",
                    ConstantsResponse.INTERNAL_SERVER_ERROR, "DataError", "DocumentData.create", error));
        }
    }
    async Destroy(id: string, next: NextFunction): Promise<any> {
        return
    }

    async GetDocumentByName(name: string, next: NextFunction): Promise<any> {
        try {
            const result = await this.dataSet.selectWh.exec('*',{name:name});
            return result[0]
        } catch (error) {
            if (error instanceof ExpressReviewsError) next(error)
            next(new ExpressReviewsError("Failed to get document by name",
                    ConstantsResponse.INTERNAL_SERVER_ERROR, "DataError", "Data.create", error));
        }
    }

    async GetDocumentWhitError(ids: string, next: NextFunction): Promise<any> {
        try {
            return await this.dataSet.selectIn.exec('*', 'id', ids);
        } catch (error) {
            if (error instanceof ExpressReviewsError) next(error)
            next(new ExpressReviewsError("Failed to  the .",
                    ConstantsResponse.INTERNAL_SERVER_ERROR, "DataError", "Data.create", error));
        }
    }

    async GetDocumentById(id: string, next: NextFunction): Promise<any> {
       try {
           return await this.dataSet.selectWh.exec('*',{id:id});
       } catch (error) {
           if (error instanceof ExpressReviewsError) next(error)
           next(new ExpressReviewsError("Failed to get document by id.",
                   ConstantsResponse.INTERNAL_SERVER_ERROR, "DataError", "Data.create", error));
       }
    }

    async List(params: Object, next: NextFunction): Promise<any> {
     try {
         return await this.dataSet.pagination.exec('*',params,documentValidateField,'/document');
     } catch (error) {
         if (error instanceof ExpressReviewsError) next(error)
         next(new ExpressReviewsError("Failed to  the .",
                 ConstantsResponse.INTERNAL_SERVER_ERROR, "DataError", "Data.create", error));
     }
    }

}

export default  new DocumentData();
