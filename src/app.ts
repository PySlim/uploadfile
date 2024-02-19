import cors from 'cors'
import DataErrorRouter from "./app/dataError/router/dataError.router";
import DocumentRouter from "./app/document/router/document.router";
import express from "express";
import fileUpload from "express-fileupload";
import swaggerSpec from "./resources/swagger/swagger";
import swaggerUi from 'swagger-ui-express';
import UsersRouter from "./app/users/router/users.router";
import {HandlerError} from "./utils/error/handlerError";
import {PaginateMiddleware} from "./resources/middlewares/paginate.middleware";


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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/user', UsersRouter);
app.use('/document', DocumentRouter);
app.use('/data', DataErrorRouter)



app.use(HandlerError)


