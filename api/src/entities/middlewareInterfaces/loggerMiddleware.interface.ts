import { NextFunction, Request, Response } from "express";

export interface ILoggerMiddleware{
    handle(req : Request, res : Response,next : NextFunction):void
}