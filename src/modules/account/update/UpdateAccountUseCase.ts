import { AppDataSource } from "../../../data-source";
import { Account } from "../entitities/Account.entity";
import {
  iUpdateAccount,
  iUpdateAccountResponse,
} from "./interfaces/updateAccount.interface";

export class UpdateAccountUseCase {
  constructor(
    private accountRepository = AppDataSource.getRepository(Account)
  ) {}
  async resolve(
    { username, phone, bio }: iUpdateAccount,
    userId: number
  ): Promise<iUpdateAccountResponse> {
    try {
      const accountExist = await this.accountRepository.findOneBy({
        id_account: userId,
      });

      if (!accountExist) {
        return {
          status: "error",
          message: "Account not found on our database. Please try again!",
          code: 404,
        };
      }

      if (username) {
        const usernameExist = await this.accountRepository.findOneBy({
          username,
        });

        if (usernameExist && usernameExist.id_account !== userId) {
          return {
            status: "error",
            message: "Username already in use. Please use a different one!",
            code: 409,
          };
        }
      }

      accountExist.username = username ? username : accountExist.username;
      accountExist.phone = phone ? phone : accountExist.phone;
      accountExist.bio = bio ? bio : accountExist.bio;
      accountExist.updated_at = new Date();

      await this.accountRepository.save(accountExist);

      return {
        status: "success",
        message: "Account successfully updated!",
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
