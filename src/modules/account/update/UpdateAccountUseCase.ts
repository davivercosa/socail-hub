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
    accountId: number
  ): Promise<iUpdateAccountResponse> {
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

      if (username) {
        const account = await this.accountRepository.findOneBy({
          username,
        });

        if (account && account.id_account !== accountId) {
          return {
            status: "error",
            message: "Username already in use. Please use a different one!",
            code: 409,
          };
        }
      }

      account.username = username ? username : account.username;
      account.phone = phone ? phone : account.phone;
      account.bio = bio ? bio : account.bio;
      account.updated_at = new Date();

      await this.accountRepository.save(account);

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
