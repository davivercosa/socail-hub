import bcrypt from "bcrypt";

import { AppDataSource } from "../../../data-source";
import { JwtManager } from "../../../utils/JwtManager";

import { Account } from "../entitities/Account.entity";

import {
  iLoginAccount,
  iLoginAccountResponse,
} from "./interfaces/loginAccount.interface";

export class LoginAccountUseCase {
  constructor(
    private accountRepository = AppDataSource.getRepository(Account)
  ) {}

  async resolve({
    username,
    password,
  }: iLoginAccount): Promise<iLoginAccountResponse> {
    try {
      const account = await this.accountRepository.findOneBy({
        username,
      });

      if (!account) {
        return {
          status: "error",
          message:
            "Credentials not matched. Please, try again with your correct acccount information!",
          code: 401,
        };
      }

      const passwordCorrect = await bcrypt.compare(password, account.password);

      if (!passwordCorrect) {
        return {
          status: "error",
          message:
            "Credentials not matched. Please, try again with your correct acccount information!",
          code: 401,
        };
      }

      return new JwtManager().create(account);
    } catch (error) {
      return {
        status: "error",
        message: error.toString(),
        code: 500,
      };
    }
  }
}
