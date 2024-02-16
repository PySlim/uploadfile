import {UsersControllerInterface} from "./users.controller.interface";
import {NextFunction, Request, Response} from "express";
import {RefactorResponse} from "../../../utils/response/refactor.response";
import {userSchemaResponse} from "../model/users.response.models";
import {ConstantsResponse} from "../../../constants/constants";
import ExpressReviewsError from "../../../utils/error/expressReviewError";
import UsersService from "../service/users.service";


class UsersController implements  UsersControllerInterface{
    async Create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
             const user = await UsersService.Create(req, next);
             if(!user) return
             const response = RefactorResponse(userSchemaResponse,user,'user Create successfully',next);
             res.status(ConstantsResponse.CREATED).json(response);
        } catch (error) {
             if (error instanceof ExpressReviewsError) next(error)
             next(new ExpressReviewsError("Failed to Create the user", ConstantsResponse.INTERNAL_SERVER_ERROR, "ControllerError",'userController.Create' ,error));
        }
    }

    async Destroy(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
             const user  = await UsersService.Destroy(req, next);
             if(!user) return
             res.status(ConstantsResponse.NO_CONTENT).send();
        } catch (error) {
             if (error instanceof ExpressReviewsError) next(error)
             next(new ExpressReviewsError("Failed to Destroy the user", ConstantsResponse.INTERNAL_SERVER_ERROR, "ControllerError",'userController.Destroy' ,error));
        }
    }

    async Retrieve(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
             const user = await UsersService.Retrieve(req, next);
             if(!user) return
             const response = RefactorResponse(userSchemaResponse,user,'Category Retrieve successfully',next);
             res.status(ConstantsResponse.OK).json(response);
        } catch (error) {
             if (error instanceof ExpressReviewsError) next(error)
             next(new ExpressReviewsError("Failed to Retrieve the user", ConstantsResponse.INTERNAL_SERVER_ERROR, "ControllerError",'userController.Retrieve' ,error));
        }
    }

    async Update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
             const user = await UsersService.Update(req, next);
             if(!user) return
             const response = RefactorResponse(userSchemaResponse,user,'Category Update successfully',next);
             res.status(ConstantsResponse.OK).json(response);
        } catch (error) {
             if (error instanceof ExpressReviewsError) next(error)
             next(new ExpressReviewsError("Failed to Update the user", ConstantsResponse.INTERNAL_SERVER_ERROR, "ControllerError",'userController.Update' ,error));
        }
    }

    async Login(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
             const user = await UsersService.Login(req, next);
             if(!user) return
             const response = RefactorResponse(userSchemaResponse,user,'User sign successfully',next);
             res.status(ConstantsResponse.OK).json(response);
        } catch (error) {
             if (error instanceof ExpressReviewsError) next(error)
             next(new ExpressReviewsError("Failed to sign the user", ConstantsResponse.INTERNAL_SERVER_ERROR, "ControllerError",'userController.Sign' ,error));
        }
    }


}

export default  new UsersController()
