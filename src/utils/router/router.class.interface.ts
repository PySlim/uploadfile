import { Router } from "express";

export interface RouterInterface {
    router: Router
    initializeRoutes(): void;
    getRouter(): Router;
}
