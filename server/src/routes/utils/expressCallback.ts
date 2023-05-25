import HTTP_STATUS_CODES from "@utils/constants/httpStatusCodes";
import Logger from "@utils/logger";
import { Request, Response } from "express";

export default (controller: CallableFunction) =>
  (req: Request, res: Response) => {
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

    controller(httpRequest)
      .then((response: { status: number; data: any; meta: any }) => {
        res.set("Content-Type", "application/json");
        const body = {
          data: response.data,
          meta: response.meta ?? {},
        };
        res.status(response.status).json(body);
      })
      .catch((e: any) => {
        Logger.error(e);
        res.status(e.status ?? HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
          code: e.code ?? "INTERNAL_SERVER_ERROR",
          message: e.message ?? "Something went wrong on server",
        });
      });
  };
