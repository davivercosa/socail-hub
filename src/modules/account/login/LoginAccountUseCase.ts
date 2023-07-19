import { AppDataSource } from "../../../data-source";
import { Account } from "../entitities/Account.entity";
import {
  iLoginAccount,
  iLoginAccountResponse,
} from "./interfaces/loginAccount.interface";

import bcrypt from "bcrypt";

export class LoginAccountUseCase {
  constructor(
    private accountRepository = AppDataSource.getRepository(Account)
  ) {}

  async resolve({
    username,
    password,
  }: iLoginAccount): Promise<iLoginAccountResponse> {
    try {
      const accountExist = await this.accountRepository.findOneBy({
        username,
      });

      if (!accountExist) {
        return {
          status: "error",
          message:
            "Credentials not matched. Please, try again with your correct acccount information!",
          code: 401,
        };
      }

      const passwordCorrect = await bcrypt.compare(
        password,
        accountExist.password
      );

      if (!passwordCorrect) {
        return {
          status: "error",
          message:
            "Credentials not matched. Please, try again with your correct acccount information!",
          code: 401,
        };
      }

      return {
        status: "success",
        message: "Login successfully done!",
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
