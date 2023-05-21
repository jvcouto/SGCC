import Logger from "@utils/logger";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import NotAuthenticatedError from "src/errors/notAuthenticatedError";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    const message = "Token not provided";
    Logger.error(message);
    throw new NotAuthenticatedError(message);
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = jwt.verify(token, process.env.JWT_TOKEN as string) as any;
    const { uuid, userRoles } = data;
    req.user = { uuid, userRoles };
    return next();
  } catch (error) {
    Logger.error(error as string);
    throw new NotAuthenticatedError("User Not Authenticated");
  }
};

export default authMiddleware;
