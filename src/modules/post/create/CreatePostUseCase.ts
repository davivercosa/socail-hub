import { AppDataSource } from "../../../data-source";

import { Account } from "../../account/entitities/Account.entity";
import { Post } from "../entities/Post.entity";

import {
  iCreatePost,
  iCreatePostResponse,
} from "./interfaces/createPost.interface";

export class CreatePostUseCase {
  constructor(
    private postRepository = AppDataSource.getRepository(Post),
    private accountRepository = AppDataSource.getRepository(Account)
  ) {}

  async resolve(
    { content }: iCreatePost,
    accountId: number
  ): Promise<iCreatePostResponse> {
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

      const post = new Post();

      post.account = account;
      post.content = content;

      await this.postRepository.insert(post);

      return {
        status: "success",
        message: "Post successfully created!",
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
