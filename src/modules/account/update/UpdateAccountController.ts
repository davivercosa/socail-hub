import { Request, Response } from "express";

import { UpdateAccountUseCase } from "./UpdateAccountUseCase";

import {
  iUpdateAccount,
  iUpdateAccountResponse,
} from "./interfaces/updateAccount.interface";

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
