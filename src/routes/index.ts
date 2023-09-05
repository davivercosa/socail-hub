import { Router } from "express";
import { Request, Response } from "express";
import { iApiResponse } from "../shared/interfaces/response.interface";

import AccountRoutes from "./account";
import FollowerRoutes from "./follower";
import PostRoutes from "./post";
import CommentRoutes from "./comment";

const router = Router();

const routes = [AccountRoutes, FollowerRoutes, PostRoutes, CommentRoutes];

routes.forEach((obj) => {
  obj.routes.forEach((route) => {
    router[route.method](
      obj.path + route.route,
      route.middlewares,
      (request: Request, response: Response, next: Function) => {
        const result = new (route.controller as any)()[route.action](
          request,
          response,
          next
        );
        result.then((result: iApiResponse) => {
          if (result.status === "error" || result.status === "success") {
            response.status(result.code);

            delete result.code;

            response.json(result);

            return;
          } else {
            result !== null && result !== undefined
              ? response.send(result)
              : undefined;
          }
        });
      }
    );
  });
});

export { router };
