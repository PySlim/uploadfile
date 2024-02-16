import {DataInterface} from "../../../utils/router/data.interface";
import {NextFunction} from "express";

export interface DocumentDataInterface extends  Omit<DataInterface, 'Retrieve' | 'Update'>{
    GetDocumentByName(name:string, next:NextFunction):Promise<any>
    GetDocumentWhitError(ids: string, next: NextFunction):Promise<any>
    GetDocumentById(id:string, next:NextFunction):Promise<any>
}
