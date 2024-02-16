import {DataInterface} from "../../../utils/router/data.interface";
import {NextFunction} from "express";

export interface DataErrorDataInterface extends  Omit<DataInterface, 'Destroy' | 'List' | 'Retrieve'> {
    GetDataErrorByDocument(next :NextFunction):Promise<any>
    GetErrorByDocumentId(id: string , next: NextFunction):Promise<any>
    GetDataErrorById(id:string , next: NextFunction):Promise<any>
}
