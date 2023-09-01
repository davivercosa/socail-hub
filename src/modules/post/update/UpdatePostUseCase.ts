import { AppDataSource } from "../../../data-source";

import { Account } from "../../account/entitities/Account.entity";
import { Post } from "../entities/Post.entity";

import {
  iUpdatePost,
  iUpdatePostResponse,
} from "./interfaces/updatePost.interface";

export class UpdatePostUseCase {
  constructor(
    private postRepository = AppDataSource.getRepository(Post),
    private accountRepository = AppDataSource.getRepository(Account)
  ) {}

  async resolve(
    { id_post, content }: iUpdatePost,
    accountId: number
  ): Promise<iUpdatePostResponse> {
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

      const post = await this.postRepository.findOneBy({
        id_post,
        account,
      });

      if (!post) {
        return {
          status: "error",
          message: "Something went wrong. Please try again",
          code: 403,
        };
      }

      post.content = content;
      post.updated_at = new Date();

      await this.postRepository.save(post);

      return {
        status: "success",
        message: "Post successfully updated!",
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
