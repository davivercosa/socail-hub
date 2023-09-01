import { AppDataSource } from "../../../data-source";

import { Account } from "../../account/entitities/Account.entity";
import { Post } from "../entities/Post.entity";

import {
  iDeletePost,
  iDeletePostResponse,
} from "./interfaces/deletePost.interface";

export class DeletePostUseCase {
  constructor(
    private postRepository = AppDataSource.getRepository(Post),
    private accountRepository = AppDataSource.getRepository(Account)
  ) {}

  async resolve(
    { id_post }: iDeletePost,
    accountId: number
  ): Promise<iDeletePostResponse> {
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

      await this.postRepository.delete(post);

      return {
        status: "success",
        message: "Post successfully deleted!",
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
