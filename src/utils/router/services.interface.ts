import { NextFunction, Request } from "express";

export interface ServiceInterface {
    Create(req: Request, next: NextFunction): Promise<any>;
    Destroy(req: Request, next: NextFunction): Promise<any>;
    List(req: Request, next: NextFunction): Promise<any>;
    Retrieve(req: Request, next: NextFunction): Promise<any>;
    Update(req: Request, next: NextFunction): Promise<any>;
};
