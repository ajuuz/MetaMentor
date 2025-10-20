import "reflect-metadata";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import {
  errorMiddleware,
  loggerMiddleware,
} from "infrastructure/dependencyInjection/resolver";
import { AdminRoutes } from "presentation/route/admin";
import { AuthRoutes } from "presentation/route/auth";
import { CommonRoutes } from "presentation/route/common";
import { MentorRoutes } from "presentation/route/mentor";
import { PaymentRoutes } from "presentation/route/payment";
import { UserRoutes } from "presentation/route/user";
import { config } from "shared/config";
export class App {
  private _app: Application;

  constructor() {
    this._app = express();
    this.configureMiddleware();
    this.configureRoutes();
    this.configureErrorMiddleware();
  }

  private configureRoutes(): void {
    this._app.use("/api/auth", new AuthRoutes().getRouter());
    this._app.use("/api/admin", new AdminRoutes().getRouter());
    this._app.use("/api/mentor", new MentorRoutes().getRouter());
    this._app.use("/api/common", new CommonRoutes().getRouter());
    this._app.use("/api/payment", new PaymentRoutes().getRouter());
    this._app.use("/api", new UserRoutes().getRouter());
  }

  private configureMiddleware(): void {
    this._app.use(
      cors({
        origin: [config.client.uri],
        credentials: true,
      })
    );
    this._app.use(loggerMiddleware.handle.bind(loggerMiddleware));
    this._app.use(cookieParser());
    this._app.use((req, res, next) => {
      console.log(
        `Incoming request: ${req.method} ${req.url}, Content-Length: ${req.headers["content-length"]}`
      );
      next();
    });
    this._app.use(express.urlencoded({ extended: true, limit: "10mb" }));
  }

  private configureErrorMiddleware(): void {
    this._app.use(errorMiddleware.handleError.bind(errorMiddleware));
  }

  public getApp(): Application {
    return this._app;
  }
}
