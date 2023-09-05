import { Request, Response } from "express";

import { CreateCommentUseCase } from "./CreateCommentUseCase";

import {
  iCreateComment,
  iCreateCommentResponse,
} from "./interfaces/createComment.interface";

export class CreateCommentController {
  async handle(
    request: Request,
    response: Response
  ): Promise<iCreateCommentResponse> {
    const commentInfo = request.body as iCreateComment;

    const accountId = request.user.id;

    return await new CreateCommentUseCase().resolve(commentInfo, accountId);
  }
}
