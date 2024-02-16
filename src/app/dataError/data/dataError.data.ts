import {DataErrorDataInterface} from "./dataError.data.interface";
import MainQuery from "../../../utils/database/query/main.query.class";
import {NextFunction} from "express";
import ExpressReviewsError from "../../../utils/error/expressReviewError";
import {ConstantsResponse} from "../../../constants/constants";






class DataErrorData implements  DataErrorDataInterface{
    dataSet: MainQuery  = new MainQuery('DATAERROR');
    async Create(data: Object, next: NextFunction): Promise<any> {
        try {
            return await this.dataSet.insert.exec(data);
        } catch (error) {
            if (error instanceof ExpressReviewsError) next(error)
            next(new ExpressReviewsError("Failed to create data error.",
                    ConstantsResponse.INTERNAL_SERVER_ERROR, "DataError", "DataErrorData.create", error));
        }
    }

    async GetDataErrorByDocument(next: NextFunction): Promise<any> {
        try {
            return await this.dataSet.selectGroupBy.exec('document_id',{status: true},'document_id');
        } catch (error) {
            if (error instanceof ExpressReviewsError) next(error)
            next(new ExpressReviewsError("Failed get data error by document.",
                    ConstantsResponse.INTERNAL_SERVER_ERROR, "DataError", "Data.create", error));
        }
    }

    async GetErrorByDocumentId(id: string, next: NextFunction): Promise<any> {
    try {
        return await this.dataSet.selectJoin.exec('*','ERROR','ID','DATAERROR_ID',{STATUS:true, document_id:id});
    } catch (error) {
        if (error instanceof ExpressReviewsError) next(error)
        next(new ExpressReviewsError("Failed to  the .",
                ConstantsResponse.INTERNAL_SERVER_ERROR, "DataError", "Data.create", error));
    }
    }

    async GetDataErrorById(id: string, next: NextFunction): Promise<any> {
       try {
           const result = await this.dataSet.selectWh.exec('name, role, email, age, password',{id:id});
           return result[0]
       } catch (error) {
           if (error instanceof ExpressReviewsError) next(error)
           next(new ExpressReviewsError("Failed to get data error by id .",
                   ConstantsResponse.INTERNAL_SERVER_ERROR, "DataError", "Data.create", error));
       }
    }

    async Update(id: string, data: Object, next: NextFunction): Promise<any> {
        try {
            return await this.dataSet.update.exec(id,data);
        } catch (error) {
            if (error instanceof ExpressReviewsError) next(error)
            next(new ExpressReviewsError("Failed to update data error.",
                    ConstantsResponse.INTERNAL_SERVER_ERROR, "DataError", "Data.create", error));
        }
    }




}

export default new DataErrorData()
