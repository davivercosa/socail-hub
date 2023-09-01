import { Request, Response } from "express";

import { DeletePostUseCase } from "./DeletePostUseCase";

import {
  iDeletePost,
  iDeletePostResponse,
} from "./interfaces/deletePost.interface";

export class DeletePostController {
  async handle(
    request: Request,
    response: Response
  ): Promise<iDeletePostResponse> {
    const postInfo = request.body as iDeletePost;

    const accountId = request.user.id;

    return await new DeletePostUseCase().resolve(postInfo, accountId);
  }
}
