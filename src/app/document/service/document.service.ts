import {DocumentServiceInterface} from "./document.service.interface";
import {NextFunction, Request} from "express";
import {uploadFile} from "../../../utils/aws/s3";
import {ThrowErrorHandler} from "../../../utils/error/throw.error";
import ExpressReviewsError from "../../../utils/error/expressReviewError";
import {ConstantsResponse} from "../../../constants/constants";
import csv from 'csv-parser'
import fs from "node:fs";
import {userValidateSchema} from "../../users/model/user.validate.model";
import {z, ZodError} from "zod";
import DocumentData from "../data/document.data";
import {documentInterfaceData} from "../model/document.object.model";
import DataErrorData from "../../dataError/data/dataError.data";
import UserData from "../../users/data/user.data";
import {dataErrorInterfaceData} from "../../dataError/model/dataError.object.model";
import ErrorData from "../../error/data/error.data";
import {CsvInterface} from "./interfaces/csv.interface";
import {UploadedFile} from "express-fileupload";
import {userInterfaceData} from "../../users/model/users.object.models";
import {DocumentIdsInterface} from "./interfaces/document.ids.interface";




class DocumentService implements  DocumentServiceInterface{

    private async  UploadDocument(req: Request, next: NextFunction){
        try{
            let name: string = ''
            let path: string = ''
            if(req.files){
                const document: UploadedFile | undefined = req.files ? req.files['file'] as UploadedFile : undefined;
                if (document)  name = document.name
                const documentSearch = await DocumentData.GetDocumentByName(name , next)
                if ( documentSearch){
                    ThrowErrorHandler(new ExpressReviewsError('Document exist',
                        ConstantsResponse.FORBIDDEN, 'Validation Error', 'DocumentService'), next)
                    return
                }
                const result = await uploadFile(document)// UPLOAD DOCUMENT
                if(result.$metadata.httpStatusCode === 200){

                    const data = {
                        name: name,
                        url: `https://slim1982.s3.amazonws.com/${name}`,
                        status: true,
                        created: new Date().toISOString(),
                        updated: new Date().toISOString()
                    }
                    const doc: documentInterfaceData = await DocumentData.Create(data, next)
                    if (document?.tempFilePath) {
                         path = document.tempFilePath
                    }
                    return {doc, path}
                }else{
                    ThrowErrorHandler(new ExpressReviewsError('File not upload',
                        ConstantsResponse.FORBIDDEN, 'Validation Error', 'DocumentService'), next)
                    return
                }
            }else{
                ThrowErrorHandler(new ExpressReviewsError('File not upload',
                    ConstantsResponse.FORBIDDEN, 'Validation Error', 'DocumentService'), next)
                return
            }
        }catch (error) {
            ThrowErrorHandler(new ExpressReviewsError('File not upload',
                ConstantsResponse.FORBIDDEN, 'Validation Error', 'DocumentService'), next)
            return
        }
    }
    private async CreateDataError(data: CsvInterface, documentId: string, next: NextFunction){
        const bodyDataError = {
            name: data.name,
            email: data.email,
            age: data.age,
            role: data.role,
            password: data.password,
            document_id: documentId,
            status: true,
            created: new Date().toISOString(),
            updated: new Date().toISOString()
        }
        return await DataErrorData.Create(bodyDataError, next)
    }
    private async CreateError(error: ZodError, next: NextFunction, dataErrorId: string){
        const bodyError = error.formErrors.fieldErrors
        if( bodyError){
            const transformedObject = Object.keys(bodyError).reduce((acc, key) => {
                acc[key] = bodyError[key]![0] ;
                return acc;
            }, {} as {[key: string]: string});

            const dataBodyError={
                name_error: transformedObject['name'],
                email_error: transformedObject['email'],
                password_error: transformedObject['password'],
                role_error: transformedObject['role'],
                dataerror_id:dataErrorId,
                age_error: transformedObject['age'],
                status: true,
                created:  new Date().toISOString(),
                updated: new Date().toISOString()
            }

            await ErrorData.Create(dataBodyError, next)
        }
    }

    private async VerifyRoleUser(req: Request, next:NextFunction){
        const idUser = req.id as string
        const userSearch: userInterfaceData = await UserData.GetUserById(idUser, next)
        if(userSearch.role !== 'admin'){
            ThrowErrorHandler(new ExpressReviewsError('Invalid Credentials',
                ConstantsResponse.FORBIDDEN, 'Validation Error', 'DocumentService'), next)
            return
        }
        return userSearch
    }
    async Create(req: Request, next: NextFunction): Promise<any> {
        try {
            const user = await this.VerifyRoleUser(req,next)
            if(!user) return
            const columnsRequired = ['name', 'email', 'age', 'role', 'password'];
            const result = await this.UploadDocument(req, next)
            if(result) {
                const { doc, path} = result;
                fs.createReadStream(path)
                    .pipe(csv())
                    .on('headers', (headers)=>{
                        const allColumnsPresent = columnsRequired.every(column => headers.includes(column));
                        if (!allColumnsPresent){
                            ThrowErrorHandler(new ExpressReviewsError('Invalid format CSV',
                                ConstantsResponse.FORBIDDEN, 'Validation Error', 'DocumentService'), next)
                            return
                        }
                    })
                    .on('data',async (data)=>{
                        try{
                            const dataValidated = userValidateSchema.parse(data);
                            const userSearch: userInterfaceData = await UserData.GetUserByUserName(dataValidated.email, next)
                            if(userSearch){
                                const dataError: dataErrorInterfaceData = await this.CreateDataError(data,doc.id.toString(), next)
                                const bodyError ={
                                    email_error:'Email is in used',
                                    dataerror_id: dataError.id,
                                    status: true,
                                    created: new Date().toISOString(),
                                    updated: new Date().toISOString()
                                }
                                await ErrorData.Create(bodyError,next)
                            }else{
                                await UserData.Create(dataValidated,next)
                            }

                        }catch(error){
                            if(error instanceof  z.ZodError){
                                const dataError: dataErrorInterfaceData = await this.CreateDataError(data,doc.id.toString(),next)
                                await this.CreateError(error,next,dataError.id.toString())
                            }
                        }
                    })
            }

        } catch (error) {
            next(error)
        }
    }
    async Retrieve(req: Request, next: NextFunction): Promise<any> {
        return
    }

    async GetDocumentWhitError(req: Request, next: NextFunction): Promise<any> {
        try {
            const user = await this.VerifyRoleUser(req, next)
            if(!user) return
            const documentsIds: DocumentIdsInterface[] = await DataErrorData.GetDataErrorByDocument(next)
            const idArray = documentsIds.map((item)=>item.document_id);
            const idString = idArray.join(',');
            return await DocumentData.GetDocumentWhitError(`(${idString})`, next)
        } catch (error) {
            next(error)
        }
    }

    async GetErrorByDocument(req: Request, next: NextFunction): Promise<any> {
        try {
            const user = await this.VerifyRoleUser(req, next)
            if(!user) return
            const id: string = req.params['id'];
            if (typeof Number(id) !== 'number' ) {
                ThrowErrorHandler(new ExpressReviewsError('Invalid Id format or not data found',
                    ConstantsResponse.BAD_REQUEST, 'ValidationError', "The parameter's Id is invalid or not data found"), next)
                return
            }
            const documentSearch: documentInterfaceData = await DocumentData.GetDocumentById(id, next)
            if(!documentSearch){
                ThrowErrorHandler(new ExpressReviewsError('Document not found by id',
                    ConstantsResponse.BAD_REQUEST, 'ValidationError', "The parameter's Id is invalid or not data found"), next)
                return
            }
            return await DataErrorData.GetErrorByDocumentId(id,next)
        } catch (error) {
            next(error)
        }
    }

    async List(req: Request, next: NextFunction): Promise<any> {
        try {
            const user = await this.VerifyRoleUser(req, next)
            if(!user) return
            const query = req.query
            const {queryResult, dataPagination} = await DocumentData.List(query ,next)
            req.pagination_result= dataPagination
            return queryResult
        } catch (error) {
            next(error)
        }
    }

}

export default  new DocumentService()

