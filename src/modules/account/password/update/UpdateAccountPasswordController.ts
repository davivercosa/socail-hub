import { Request, Response } from "express";

import { UpdateAccountPasswordUseCase } from "./UpdateAccountPasswordUseCase";

import {
  iUpdateAccountPassword,
  iUpdateAccountPasswordResponse,
} from "./interfaces/updateAccountPassword.interface";

export class UpdateAccountPasswordController {
  async handle(
    request: Request,
    response: Response
  ): Promise<iUpdateAccountPasswordResponse> {
    const passwordInfo = request.body as iUpdateAccountPassword;

    const accountId = request.user.id;

    return await new UpdateAccountPasswordUseCase().resolve(
      passwordInfo,
      accountId
    );
  }
}
