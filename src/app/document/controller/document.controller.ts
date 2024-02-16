import {DocumentControllerInterface} from "./document.controller.interface";
import {NextFunction, Request, Response} from "express";
import DocumentService from "../service/document.service";
import ExpressReviewsError from "../../../utils/error/expressReviewError";
import {ConstantsResponse} from "../../../constants/constants";
import {RefactorResponse} from "../../../utils/response/refactor.response";
import {DocumentSchemaResponse} from "../model/document.response.model";




class DocumentController implements DocumentControllerInterface{
    async Create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
             await DocumentService.Create(req, next);
             res.status(ConstantsResponse.CREATED).json('Document created successfully');
        } catch (error) {
             if (error instanceof ExpressReviewsError) next(error)
             next(new ExpressReviewsError("Failed to Create  document", ConstantsResponse.INTERNAL_SERVER_ERROR, "ControllerError",'documentController.Create' ,error));
        }
    }

    async Retrieve(req: Request, res: Response, next: NextFunction): Promise<void> {
        return
    }

    async GetDocumentWhitError(req: Request ,res: Response, next: NextFunction): Promise<void> {
        try {
             const document  = await DocumentService.GetDocumentWhitError( req, next);
             if(!document) return
             const response = RefactorResponse(DocumentSchemaResponse,document,'  successfully',next);
             res.status(ConstantsResponse.OK).json(response);
        } catch (error) {
             if (error instanceof ExpressReviewsError) next(error)
             next(new ExpressReviewsError("Failed to   document", ConstantsResponse.INTERNAL_SERVER_ERROR, "ControllerError",'documentController.' ,error));
        }
    }

    async GetErrorByDocument(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
             const document = await DocumentService.GetErrorByDocument(req, next);
             if(!document) return
             res.status(ConstantsResponse.OK).json(document);
        } catch (error) {
             if (error instanceof ExpressReviewsError) next(error)
             next(new ExpressReviewsError("Failed to   document", ConstantsResponse.INTERNAL_SERVER_ERROR, "ControllerError",'documentController.' ,error));
        }
    }

    async List(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
             const document = await DocumentService.List(req, next);
             if(!document) return
            console.log(document)
             const response = RefactorResponse(DocumentSchemaResponse,document,'Document List successfully',next);
             res.status(ConstantsResponse.OK).json(response);
        } catch (error) {
             if (error instanceof ExpressReviewsError) next(error)
             next(new ExpressReviewsError("Failed to List  document", ConstantsResponse.INTERNAL_SERVER_ERROR, "ControllerError",'documentController.List' ,error));
        }
    }

}

export default  new DocumentController();
