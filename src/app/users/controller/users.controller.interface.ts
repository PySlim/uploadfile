import {ControllerInterface} from "../../../utils/router/controllers.interface";
import {NextFunction, Request, Response} from "express";

export interface UsersControllerInterface extends  Omit<ControllerInterface, 'List'>{
    Login(req: Request, res: Response, next: NextFunction):Promise<any>
}
