import {UserDataInterface} from "./user.data.interface";
import MainQuery from "../../../utils/database/query/main.query.class";
import {NextFunction} from "express";
import ExpressReviewsError from "../../../utils/error/expressReviewError";
import {ConstantsResponse} from "../../../constants/constants";


class UserData implements  UserDataInterface{
    dataSet: MainQuery = new MainQuery('USERS');
    async Create(data: Object, next: NextFunction): Promise<any> {
    try {
        return await this.dataSet.insert.exec(data);
    } catch (error) {
        if (error instanceof ExpressReviewsError) next(error)
        next(new ExpressReviewsError("Failed to  the .",
                ConstantsResponse.INTERNAL_SERVER_ERROR, "DataError", "Data.create", error));
    }
    }

    async Destroy(id: string, next: NextFunction): Promise<any> {
        try {
            return await this.dataSet.update.exec(id,{status:false});
        } catch (error) {
            if (error instanceof ExpressReviewsError) next(error)
            next(new ExpressReviewsError("Failed to delete user.",
                    ConstantsResponse.INTERNAL_SERVER_ERROR, "DataError", "UserData.Delete", error));
        }
    }

    async Retrieve(id: string, next: NextFunction): Promise<any> {
        try {
            const result = await this.dataSet.selectWh.exec("*",{id:id});
            return result[0]
        } catch (error) {
            if (error instanceof ExpressReviewsError) next(error)
            next(new ExpressReviewsError("Failed to get user.",
                    ConstantsResponse.INTERNAL_SERVER_ERROR, "DataError", "Data.create", error));
        }
    }

    async Update(id: string, data: Object, next: NextFunction): Promise<any> {
        try {
            return await this.dataSet.update.exec(id, data);
        } catch (error) {
            if (error instanceof ExpressReviewsError) next(error)
            next(new ExpressReviewsError("Failed to update  user .",
                    ConstantsResponse.INTERNAL_SERVER_ERROR, "DataError", "UserData.Update", error));
        }
    }

    async GetUserByUserName(email: string, next: NextFunction): Promise<any> {
        try {
            const result = await this.dataSet.selectWh.exec('*',{email:email});
            return result[0]
        } catch (error) {
            if (error instanceof ExpressReviewsError) next(error)
            next(new ExpressReviewsError("Failed to  the find user by username.",
                    ConstantsResponse.INTERNAL_SERVER_ERROR, "DataError", "UserData.GetUserByUserName", error));
        }
    }

    async Login(email: string, next: NextFunction): Promise<any> {
        try {

            const result = await this.dataSet.selectWh.exec('*',{email:email});
            return result[0]
        } catch (error) {
            if (error instanceof ExpressReviewsError) next(error)
            next(new ExpressReviewsError("Failed to  the sign user.",
                    ConstantsResponse.INTERNAL_SERVER_ERROR, "DataError", "UserData.sign", error));
        }
    }

    async GetUserById(id: string, next: NextFunction): Promise<any> {
        try {
            const result = await this.dataSet.selectWh.exec('*',{id:id});
            return result[0]
        } catch (error) {
            if (error instanceof ExpressReviewsError) next(error)
            next(new ExpressReviewsError("Failed to get user by id.",
                    ConstantsResponse.INTERNAL_SERVER_ERROR, "DataError", "UserData.GetUserById", error));
        }
    }

}


export default  new UserData()
