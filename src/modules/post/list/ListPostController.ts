import { Request, Response } from "express";

import { ListPostUseCase } from "./ListPostUseCase";

import { iListPostResponse } from "./interfaces/listPost.interface";

export class ListPostController {
  async handle(
    request: Request,
    response: Response
  ): Promise<iListPostResponse> {
    const accountId = request.user.id;

    return await new ListPostUseCase().resolve(accountId);
  }
}
