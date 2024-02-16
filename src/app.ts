
import UsersRouter from "./app/users/router/users.router";
import {HandlerError} from "./utils/error/handlerError";
import express from "express";
import {PaginateMiddleware} from "./resources/middlewares/paginate.middleware";
import cors from 'cors'
import DocumentRouter from "./app/document/router/document.router";
import fileUpload from "express-fileupload";
import DataErrorRouter from "./app/dataError/router/dataError.router";


export const app = express();

app.use(express.json());
app.use(PaginateMiddleware());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
}))
app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use('/user', UsersRouter);
app.use('/document', DocumentRouter);
app.use('/data', DataErrorRouter)



app.use(HandlerError)


