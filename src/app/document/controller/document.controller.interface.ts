import {ControllerInterface} from "../../../utils/router/controllers.interface";
import {NextFunction,Request ,Response} from "express";

export interface DocumentControllerInterface extends Omit<ControllerInterface,'Destroy' | 'Update'> {
    GetDocumentWhitError(req: Request ,res: Response, next: NextFunction):Promise<void>
    GetErrorByDocument(req:Request, res:Response, next:NextFunction):Promise<void>
}
