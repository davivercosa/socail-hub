import { AppDataSource } from "../../../data-source";

import { Account } from "../../account/entitities/Account.entity";
import { FollowerFollowing } from "../entitities/Follower.entity";

import {
  iAddRemoveFollower,
  iAddRemoveFollowerResponse,
} from "./interfaces/addRemoveFollower.interface";

export class AddRemoveFollowerUseCase {
  constructor(
    private followerFollowingRepository = AppDataSource.getRepository(
      FollowerFollowing
    ),
    private accountRepository = AppDataSource.getRepository(Account)
  ) {}

  async resolve(
    { following_id }: iAddRemoveFollower,
    accountId: number
  ): Promise<iAddRemoveFollowerResponse> {
    try {
      const following = await this.accountRepository.findOneBy({
        id_account: following_id,
      });

      const follower = await this.accountRepository.findOneBy({
        id_account: accountId,
      });

      if (!following || !follower) {
        return {
          status: "error",
          message: "Account not found on our database. Please try again!",
          code: 404,
        };
      }

      const followerFollowingRelation = new FollowerFollowing();

      followerFollowingRelation.follower = follower;
      followerFollowingRelation.following = following;

      const followerFollowsFollowing =
        await this.followerFollowingRepository.findOneBy({
          follower,
          following,
        });

      if (followerFollowsFollowing) {
        await this.followerFollowingRepository.delete(
          followerFollowingRelation
        );

        return {
          status: "success",
          message: "Account successfully unfollowed!",
          code: 200,
        };
      }

      await this.followerFollowingRepository.insert(followerFollowingRelation);

      return {
        status: "success",
        message: "Account successfully followed!",
        code: 200,
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
