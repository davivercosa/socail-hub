import { Request, Response } from "express";
import { LoginAccountUseCase } from "./LoginAccountUseCase";
import {
  iLoginAccount,
  iLoginAccountResponse,
} from "./interfaces/loginAccount.interface";

export class LoginAccountController {
  async handle(
    request: Request,
    response: Response
  ): Promise<iLoginAccountResponse> {
    const accountInfo = request.body as iLoginAccount;

    return await new LoginAccountUseCase().resolve(accountInfo);
  }
}
