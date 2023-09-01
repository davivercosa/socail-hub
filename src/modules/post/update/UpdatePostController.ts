import { Request, Response } from "express";

import { UpdatePostUseCase } from "./UpdatePostUseCase";

import {
  iUpdatePost,
  iUpdatePostResponse,
} from "./interfaces/updatePost.interface";

export class UpdatePostController {
  async handle(
    request: Request,
    response: Response
  ): Promise<iUpdatePostResponse> {
    const postInfo = request.body as iUpdatePost;

    const accountId = request.user.id;

    return await new UpdatePostUseCase().resolve(postInfo, accountId);
  }
}
