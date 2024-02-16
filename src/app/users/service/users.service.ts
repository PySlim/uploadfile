import {UsersServiceInterface} from "./users.service.interface";
import {NextFunction, Request} from "express";
import {userInterface, userInterfaceData} from "../model/users.object.models";
import {ThrowErrorHandler} from "../../../utils/error/throw.error";
import ExpressReviewsError from "../../../utils/error/expressReviewError";
import {ConstantsResponse} from "../../../constants/constants";
import * as argon2 from 'argon2';
import UserData from "../data/user.data";
import {generateToken} from "../../../resources/token/tokens";


class UsersService implements UsersServiceInterface{

    async Create(req: Request, next: NextFunction): Promise<any> {
        try {
            const body: userInterface = req.body;
            const userSearch: userInterfaceData = await UserData.GetUserByUserName(body.email, next);
            if (userSearch) {
                ThrowErrorHandler(new ExpressReviewsError('The username is already in use',
                ConstantsResponse.FORBIDDEN, 'Validation Error', 'CreateServiceUsers'), next)
                return
             }
            body.password= await argon2.hash(body.password)
            const userCreated: userInterfaceData = await UserData.Create(body, next);
            userCreated.token = generateToken(userCreated);
             return  userCreated
        } catch (error) {
            next(error)
        }
    }

    async Destroy(req: Request, next: NextFunction): Promise<any> {
        try {
            const id: string = req.params['id'];
            console.log(req.id)
            if (typeof Number(id) !== 'number' ) {
                ThrowErrorHandler(new ExpressReviewsError('Invalid Id format or not data found',
                    ConstantsResponse.BAD_REQUEST, 'ValidationError', "The parameter's Id is invalid or not data found"), next)
                return
            }
            if(id !== req.id){
                ThrowErrorHandler(new ExpressReviewsError('Invalid user',
                    ConstantsResponse.BAD_REQUEST, 'ValidationError', "Invalid User"), next)
                return
            }
            return await UserData.Destroy(id, next)
        } catch (error) {
            next(error)
        }
    }

    async Retrieve(req: Request, next: NextFunction): Promise<any> {
        try {
            const id: string = req.params['id'];
            if (typeof Number(id) !== 'number') {
                ThrowErrorHandler(new ExpressReviewsError('Invalid Id format or not data found',
                    ConstantsResponse.BAD_REQUEST, 'ValidationError', "The parameter's Id is invalid or not data found"), next)
                return
            }
            if(id !== req.id){
                ThrowErrorHandler(new ExpressReviewsError('Unknown identity',
                    ConstantsResponse.FORBIDDEN,'Validation error','Failed to login'), next)
            }
            return await UserData.Retrieve(id, next)
        } catch (error) {
            next(error)
        }
    }

    async Update(req: Request, next: NextFunction): Promise<any> {
        try {
            const body: userInterface = req.body;
            const id: string = req.params['id']
            if(id !== req.id){
                ThrowErrorHandler(new ExpressReviewsError('Invalid user',
                    ConstantsResponse.FORBIDDEN, 'Validation Error', 'UpdateServiceUsers'), next)
                return
            }
            const userSearch: userInterfaceData[] = await UserData.GetUserById(id, next);
            if (!userSearch) {
                ThrowErrorHandler(new ExpressReviewsError('Invalid user',
                ConstantsResponse.FORBIDDEN, 'Validation Error', 'UpdateServiceUsers'), next)
                return
             }
            if(body.password){
                body.password= await argon2.hash(body.password)
            }
             return await UserData.Update(id, body, next);
        } catch (error) {
            next(error)
        }
    }

    async Login(req: Request, next: NextFunction): Promise<any> {
        try {
            const body: userInterface = req.body;
            const userSearch: userInterfaceData = await UserData.Login(body.email, next);
            if (!userSearch) {
                ThrowErrorHandler(new ExpressReviewsError('User invalid',
                ConstantsResponse.FORBIDDEN, 'Validation Error', 'SignServiceUser'), next)
                return
             }
            if(!await argon2.verify(userSearch.password,body.password)){
                ThrowErrorHandler(new ExpressReviewsError('Credential invalid',
                    ConstantsResponse.FORBIDDEN, 'Validation Error', 'SignServiceUser'), next)
                return
            }
            userSearch.token= generateToken(userSearch);
             return userSearch
        } catch (error) {
            next(error)
        }
    }

}

export default  new UsersService()
