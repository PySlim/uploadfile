import {RouterInterface} from "../../../utils/router/router.class.interface";
import express, {Router} from "express";
import {ValidateIdentityMiddleware} from "../../../resources/middlewares/validate.identity.middleware";
import {ValidateRequestMiddleware} from "../../../resources/middlewares/validate.request.middleware";
import {dataErrorSchemaUpdate} from "../model/dataError.update.model";
import DataErrorController from "../controller/dataError.controller";

class DataErrorRouter implements  RouterInterface{
    router: Router = express.Router();

    constructor() {
        this.initializeRoutes()
    }
    getRouter(): Router {
        return this.router;
    }

    initializeRoutes(): void {
        this.router.patch('/:id', ValidateIdentityMiddleware(), ValidateRequestMiddleware(dataErrorSchemaUpdate), DataErrorController.Update)
    }

}

export default new DataErrorRouter().getRouter()
