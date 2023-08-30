import { Request, Response } from "express";
import {
  iUpdateAccount,
  iUpdateAccountResponse,
} from "./interfaces/updateAccount.interface";
import { UpdateAccountUseCase } from "./UpdateAccountUseCase";

export class UpdateAccountController {
  async handle(
    request: Request,
    response: Response
  ): Promise<iUpdateAccountResponse> {
    const accountInfo = request.body as iUpdateAccount;

    const accountId = request.user.id;

    return await new UpdateAccountUseCase().resolve(accountInfo, accountId);
  }
}
