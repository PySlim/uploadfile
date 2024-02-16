import { NextFunction, Request, Response } from "express";

export interface ControllerInterface {
    Create(req: Request, res: Response, next: NextFunction): Promise<void>;
    Destroy(req: Request, res: Response, next: NextFunction): Promise<void>;
    List(req: Request, res: Response, next: NextFunction): Promise<void>;
    Retrieve(req: Request, res: Response, next: NextFunction): Promise<void>;
    Update(req: Request, res: Response, next: NextFunction): Promise<void>;
};
