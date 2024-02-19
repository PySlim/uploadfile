import {RouterInterface} from "../../../utils/router/router.class.interface";
import express, {Router} from "express";
import {ValidateIdentityMiddleware} from "../../../resources/middlewares/validate.identity.middleware";
import DocumentController from "../controller/document.controller";
import {PaginateMiddleware} from "../../../resources/middlewares/paginate.middleware";

class DocumentRouter implements  RouterInterface{
    router: Router = express.Router();

    constructor() {
        this.initializeRoutes()
    }
    getRouter(): Router {
        return this.router;
    }

    initializeRoutes(): void {
        this.router.post('/',ValidateIdentityMiddleware(), PaginateMiddleware(), DocumentController.Create);
        this.router.get('/', ValidateIdentityMiddleware(), DocumentController.List)// LIS DOCUMENT
        this.router.get('/error',ValidateIdentityMiddleware(), DocumentController.GetDocumentWhitError);
        this.router.get('/error/:id',ValidateIdentityMiddleware(), DocumentController.GetErrorByDocument);
    }
}

export default new DocumentRouter().getRouter()
