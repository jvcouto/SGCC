import Logger from "@utils/Logger";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const authMiddlware = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      message: "Not Authenticated",
    });
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = jwt.verify(token, process.env.JWT_TOKEN as string) as any;
    const { uuid } = data;
    req.userUUID = uuid;
    return next();
  } catch (error) {
    Logger.error(error as string);
    return res.status(401).json({
      message: "Not Authenticated",
    });
  }
};

export default authMiddlware;
