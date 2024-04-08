import GenericCustomError from "@errors/abstractCustom.error";
import HTTP_STATUS_CODES from "@utils/constants/httpStatusCodes";
import Logger from "@utils/logger";
import { NextFunction, Request, Response } from "express";

export default (controller: CallableFunction) =>
  (req: Request, res: Response, next: NextFunction) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      user: req.user,
      source: {
        ip: req.ip,
        browser: req.get("User-Agent"),
      },
      headers: {
        "Content-Type": req.get("Content-Type"),
        Referer: req.get("referer"),
        "User-Agent": req.get("User-Agent"),
        authorization: req.get("authorization"),
      },
    };

    Logger.info(`${req.method} - ${req.originalUrl}`);

    controller(httpRequest)
      .then((response: { status: number; data: any; meta: any }) => {
        if (httpRequest.path.includes("download/pdf")) {
          res.setHeader(
            "Content-disposition",
            `attachment; filename=${new Date().toISOString()}.pdf`
          );
          res.setHeader("Content-type", "application/pdf");
          const { data: docData } = response;
          docData.pipe(res);
          docData.end();
          res.status(response.status);
          return next();
        }
        res.set("Content-Type", "application/json");
        const body = {
          data: response.data,
          meta: response.meta ?? {},
        };
        res.status(response.status).json(body);
      })
      .catch((e: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        e instanceof GenericCustomError
          ? Logger.error(e.message)
          : Logger.error(e);
        res.status(e.status ?? HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
          code: e.code ?? "INTERNAL_SERVER_ERROR",
          message: e instanceof GenericCustomError ? e.message : "Server Error",
        });
      });
  };
