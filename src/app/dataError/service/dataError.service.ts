import {DataErrorServiceInterface} from "./dataError.service.interface";
import {NextFunction, Request} from "express";
import {ThrowErrorHandler} from "../../../utils/error/throw.error";
import ExpressReviewsError from "../../../utils/error/expressReviewError";
import {ConstantsResponse} from "../../../constants/constants";
import {dataErrorInterface, dataErrorInterfaceData} from "../model/dataError.object.model";
import DataErrorData from "../data/dataError.data";
import {userValidateSchema} from "../../users/model/user.validate.model";
import UserData from "../../users/data/user.data";
import {userInterfaceData} from "../../users/model/users.object.models";

class DataErrorService implements  DataErrorServiceInterface{

    private async ValidateAndInsertUser (dataError: dataErrorInterface, next: NextFunction, id:string){
        try{
            dataError.age=dataError.age.toString()
            const dataValidated = userValidateSchema.parse(dataError);
            const user: userInterfaceData =await UserData.Create(dataValidated, next)
            if(user){
                await DataErrorData.Update(id,{status:false}, next)
            }

        }catch (error) {
            next(error)
        }
    }
    async Update(req: Request, next: NextFunction): Promise<any> {
        try {
            const id: string = req.params['id'];
            if (typeof Number(id) !== 'number' || Object.keys(req.body).length === 0) {
                ThrowErrorHandler(new ExpressReviewsError('Invalid Id format or not data found',
                    ConstantsResponse.BAD_REQUEST, 'ValidationError', "The parameter's Id is invalid or not data found"), next)
                return
            }
            const dataErrorSearch: dataErrorInterfaceData = await DataErrorData.GetDataErrorById(id,next)
            if(!dataErrorSearch){
                ThrowErrorHandler(new ExpressReviewsError('Data Error not found by id',
                    ConstantsResponse.BAD_REQUEST, 'ValidationError', "The parameter's Id is invalid or not data found"), next)
                return
            }
            const result: dataErrorInterfaceData = await DataErrorData.Update(id, req.body, next)
            const newDataError: dataErrorInterface = await DataErrorData.GetDataErrorById(result.id.toString(), next)

            await this.ValidateAndInsertUser(newDataError, next, id)
            return result
        } catch (error) {
            next(error)
        }
    }

}

export default new DataErrorService()
