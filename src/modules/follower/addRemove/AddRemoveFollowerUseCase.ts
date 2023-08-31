import { AppDataSource } from "../../../data-source";
import { Account } from "../../account/entitities/Account.entity";
import { Follower } from "../entitities/Follower.entity";
import {
  iAddRemoveFollower,
  iAddRemoveFollowerResponse,
} from "./interfaces/addRemoveFollower.interface";

export class AddRemoveFollowerUseCase {
  constructor(
    private followerRepository = AppDataSource.getRepository(Follower),
    private accountRepository = AppDataSource.getRepository(Account)
  ) {}

  async resolve(
    { account_id }: iAddRemoveFollower,
    followerId: number
  ): Promise<iAddRemoveFollowerResponse> {
    try {
      const followedAccount = await this.accountRepository.findOneBy({
        id_account: account_id,
      });

      const followerAccount = await this.accountRepository.findOneBy({
        id_account: followerId,
      });

      if (!followedAccount || !followerAccount) {
        return {
          status: "error",
          message: "Account not found on our database. Please try again!",
          code: 404,
        };
      }

      const follower = new Follower();

      follower.followerAccount = followerAccount;
      follower.followedAccount = followedAccount;

      const followerFollowsAccount = await this.followerRepository.findOneBy({
        followerAccount,
        followedAccount,
      });

      if (followerFollowsAccount) {
        await this.followerRepository.delete(follower);

        return {
          status: "success",
          message: "Account successfully unfollowed!",
          code: 200,
        };
      }

      await this.followerRepository.save(follower);

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
