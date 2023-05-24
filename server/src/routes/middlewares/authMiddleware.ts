import Logger from "@utils/logger";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    const message = "Token not provided";
    Logger.error(message);
    return res.status(401).json({ message: message, code: "TOKEN_NOT_FOUND" });
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = jwt.verify(token, process.env.JWT_TOKEN as string) as any;
    const { id, userRoles } = data;
    req.user = { id, userRoles };
    return next();
  } catch (error) {
    Logger.error(error as string);
    return res.status(401).json({
      message: "Error on user authentication!",
      code: "INVALID_TOKEN",
    });
  }
};

export default authMiddleware;
