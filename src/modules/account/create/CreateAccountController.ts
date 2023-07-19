import { Request, Response } from "express";
import { CreateAccountUseCase } from "./CreateAccountUseCase";
import {
  iCreateAccount,
  iCreateAccountResponse,
} from "./interfaces/createAccount.interface";

export class CreateAccountController {
  async handle(
    request: Request,
    response: Response
  ): Promise<iCreateAccountResponse> {
    const accountInfo = request.body as iCreateAccount;

    return await new CreateAccountUseCase().resolve(accountInfo);
  }
}
