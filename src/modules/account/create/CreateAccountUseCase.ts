import { AppDataSource } from "../../../data-source";
import { Account } from "../entitities/Account.entity";
import {
  iCreateAccount,
  iCreateAccountResponse,
} from "./interfaces/createAccount.interface";

import bcrypt from "bcrypt";

export class CreateAccountUseCase {
  constructor(
    private accountRepository = AppDataSource.getRepository(Account)
  ) {}

  async resolve({
    username,
    password,
    bio,
    phone,
  }: iCreateAccount): Promise<iCreateAccountResponse> {
    try {
      const accountExist = await this.accountRepository
        .createQueryBuilder("account")
        .where("account.username = :username", { username })
        .getExists();

      if (accountExist) {
        return {
          status: "error",
          message: "Username already in use. Please, try a different one!",
          code: 409,
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const account = Object.assign(new Account(), {
        username,
        password: hashedPassword,
        bio,
        phone,
      });

      await this.accountRepository.save(account);

      return {
        status: "success",
        message: "Account successfully created!",
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
