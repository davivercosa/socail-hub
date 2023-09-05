import { AppDataSource } from "../../../data-source";

import { Account } from "../../account/entitities/Account.entity";
import { Post } from "../../post/entities/Post.entity";
import { Comment } from "../entities/Comment.entity";

import {
  iCreateComment,
  iCreateCommentResponse,
} from "./interfaces/createComment.interface";

export class CreateCommentUseCase {
  constructor(
    private postRepository = AppDataSource.getRepository(Post),
    private accountRepository = AppDataSource.getRepository(Account),
    private commentRepository = AppDataSource.getRepository(Comment)
  ) {}

  async resolve(
    { content, post_id }: iCreateComment,
    accountId: number
  ): Promise<iCreateCommentResponse> {
    try {
      const account = await this.accountRepository.findOneBy({
        id_account: accountId,
      });

      if (!account) {
        return {
          status: "error",
          message: "Account not found on our database. Please try again!",
          code: 404,
        };
      }

      const post = await this.postRepository.findOneBy({ id_post: post_id });

      if (!post) {
        return {
          status: "error",
          message: "Post not found on our database. Please try again!",
          code: 404,
        };
      }

      const comment = new Comment();

      comment.account = account;
      comment.post = post;
      comment.content = content;

      await this.commentRepository.insert(comment);

      return {
        status: "success",
        message: "Comment successfully created!",
        code: 201,
      };
    } catch (error) {
      return {
        status: "error",
        message: error.toString(),
        code: 500,
      };
    }
  }
}
