import { Request, Response, NextFunction } from "express";
import { JwtManager } from "../utils/JwtManager";

export default async function (
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;

  if (authorization === undefined) {
    response.status(401);
    response.json({
      status: "error",
      message: "Request without authentication token!",
    });

    return;
  }

  const [bearer, token] = authorization.split(" ");

  const authenticateResp = new JwtManager().authenticate(token);

  if (authenticateResp.status === "error") {
    response.status(authenticateResp.code);

    delete authenticateResp.code;

    response.json(authenticateResp);

    return;
  }

  request.user = {
    id: authenticateResp.result.id,
  };

  request.headers.authorization = token;

  next();
}
