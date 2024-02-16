import {ServiceInterface} from "../../../utils/router/services.interface";
import {NextFunction, Request} from "express";

export interface DocumentServiceInterface extends  Omit<ServiceInterface, 'Destroy' | 'Update'>{
    GetDocumentWhitError(req: Request, next: NextFunction):Promise<any>
    GetErrorByDocument(req: Request , next:NextFunction):Promise<any>
}
