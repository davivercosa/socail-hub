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
  async resolve({
    id_account,
    username,
    phone,
    bio,
  }: iUpdateAccount): Promise<iUpdateAccountResponse> {
    try {
      const accountExist = await this.accountRepository.findOneBy({
        id_account,
      });

      if (!accountExist) {
        return {
          status: "error",
          message: "Account not found on our database. Please try again!",
          code: 404,
        };
      }

      const usernameExist = await this.accountRepository.findOneBy({
        username,
      });

      if (usernameExist && usernameExist.id_account !== id_account) {
        return {
          status: "error",
          message: "Username already in use. Please use a different one!",
          code: 409,
        };
      }

      accountExist.username = username;
      accountExist.phone = phone;
      accountExist.bio = bio;
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
