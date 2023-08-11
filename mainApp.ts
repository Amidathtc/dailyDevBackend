import express, { Application, NextFunction, Request, Response } from "express";
import { HTTP, mainError } from "./error/mainError";
import cors from "cors";
import user from "./router/userRouter";
import post from "./router/postRouter";
import comment from "./router/commentRouter";

export const mainApp = (app: Application) => {
  app.use(express.json());
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PATCH", "DELETE"],
    })
  ),

  
  app.use("/api/v1",user);
  app.use("/api/v1",post);
  app.use("/api/v1",comment);

    app.get("/", (res: Response, req: Request) => {
      res.status(HTTP.OK).json({
        message: "Awsome code",
      });
    });

  app.all("*", (req: Request, res: Response, next: NextFunction) => {
    new mainError({
      name: "Router Error",
      message: `This Error is coming up because this ${req.originalUrl} isn't correct`,
      status: HTTP.BAD_REQUEST,
      success: false,
    });
  });
};
