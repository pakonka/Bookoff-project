import express, { NextFunction, Request, Response } from "express";

interface CustomRequest extends Request {
  user: {
    name: string;
  };
}

const logMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  req.user = {
    name: "Haruka",
  };
  next();
};

export default logMiddleware;
