import { Request, Response } from "express";

import { CreatePostUseCase } from "./CreatePostUseCase";

import {
  iCreatePost,
  iCreatePostResponse,
} from "./interfaces/createPost.interface";

export class CreatePostController {
  async handle(
    request: Request,
    response: Response
  ): Promise<iCreatePostResponse> {
    const postInfo = request.body as iCreatePost;

    const accountId = request.user.id;

    return await new CreatePostUseCase().resolve(postInfo, accountId);
  }
}
