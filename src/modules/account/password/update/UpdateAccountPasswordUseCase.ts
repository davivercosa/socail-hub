import { AppDataSource } from "../../../../data-source";
import { Account } from "../../entitities/Account.entity";
import {
  iUpdateAccountPassword,
  iUpdateAccountPasswordResponse,
} from "./interfaces/updateAccountPassword.interface";

import bcrypt from "bcrypt";

export class UpdateAccountPasswordUseCase {
  constructor(
    private accountRepository = AppDataSource.getRepository(Account)
  ) {}
  async resolve({
    id_account,
    password,
  }: iUpdateAccountPassword): Promise<iUpdateAccountPasswordResponse> {
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

      const hashedPassword = await bcrypt.hash(password, 10);

      accountExist.password = hashedPassword;

      await this.accountRepository.save(accountExist);

      return {
        status: "success",
        message: "Account Password successfully updated!",
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
