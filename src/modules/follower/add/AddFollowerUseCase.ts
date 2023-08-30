import { AppDataSource } from "../../../data-source";
import { Account } from "../../account/entitities/Account.entity";
import { Follower } from "../entitities/Follower.entity";
import {
  iAddFollower,
  iAddFollowerResponse,
} from "./interfaces/addFollower.interface";

export class AddFollowerUseCase {
  constructor(
    private followerRepository = AppDataSource.getRepository(Follower),
    private accountRepository = AppDataSource.getRepository(Account)
  ) {}

  async resolve(
    { account_id }: iAddFollower,
    followerId: number
  ): Promise<iAddFollowerResponse> {
    try {
      const followedAccountExist = await this.accountRepository.findOneBy({
        id_account: account_id,
      });

      const followerAccountExist = await this.accountRepository.findOneBy({
        id_account: followerId,
      });

      if (!followedAccountExist || !followerAccountExist) {
        return {
          status: "error",
          message: "Account not found on our database. Please try again!",
          code: 404,
        };
      }

      const followRelation = new Follower();

      followRelation.followerAccount = followerAccountExist;
      followRelation.followedAccount = followedAccountExist;

      await this.followerRepository.save(followRelation);

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
