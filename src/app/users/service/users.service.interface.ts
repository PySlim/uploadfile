import {ServiceInterface} from "../../../utils/router/services.interface";
import {NextFunction, Request} from "express";

export interface  UsersServiceInterface extends Omit<ServiceInterface,'List'>{
    Login(req: Request, next: NextFunction):Promise<any>
}


