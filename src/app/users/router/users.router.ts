import {RouterInterface} from "../../../utils/router/router.class.interface";
import express, {Router} from "express";
import {ValidateRequestMiddleware} from "../../../resources/middlewares/validate.request.middleware";
import {userSchema} from "../model/users.object.models";
import UsersController from "../controller/users.controller";
import {userSchemaLogin} from "../model/users.login.models";
import {userSchemaUpdate} from "../model/users.update.models";
import {ValidateIdentityMiddleware} from "../../../resources/middlewares/validate.identity.middleware";


class UserRouter implements  RouterInterface{
    router: Router =   express.Router();
    constructor() {
        this.initializeRoutes()
    }
    getRouter(): Router {
        return this.router;
    }
    initializeRoutes(): void {
        this.router.post('/sign', ValidateRequestMiddleware(userSchema), UsersController.Create);//created  this
        this.router.post('/login', ValidateRequestMiddleware(userSchemaLogin), UsersController.Login)// this
        this.router.get('/:id', ValidateIdentityMiddleware(), UsersController.Retrieve);
        this.router.patch('/:id', ValidateRequestMiddleware(userSchemaUpdate), ValidateIdentityMiddleware(),UsersController.Update);
        this.router.delete('/:id', ValidateIdentityMiddleware(), UsersController.Destroy);
    }
}

export default  new UserRouter().getRouter();
