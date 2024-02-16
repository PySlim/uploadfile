import { NextFunction } from "express";
import MainQuery from "../database/query/main.query.class";

export interface DataInterface{
    dataSet : MainQuery;

    Create(data:Object, next:NextFunction): Promise<any>;
    Destroy(id:string, next: NextFunction): Promise<any>;
    List(params:Object, next:NextFunction): Promise<any>;
    Retrieve(id:string, next:NextFunction): Promise<any>;
    Update(id: string, data:Object, next: NextFunction): Promise<any>;
}
