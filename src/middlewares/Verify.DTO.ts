import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

import RequestManager from "../utils/RequestManager";

export default function (schema: Schema) {
  return async function (
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const verifyRequestResp = RequestManager.verify(request, schema);

    if (verifyRequestResp.status === "error") {
      const messagesError = [];

      verifyRequestResp.message.details.forEach((detail) =>
        messagesError.push(detail.message)
      );

      response.status(400);
      response.json({ status: "error", message: messagesError.join(", ") });

      return;
    }

    next();
  };
}
