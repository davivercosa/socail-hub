import { Request, Response } from "express";
import {
  iUpdateAccountPassword,
  iUpdateAccountPasswordResponse,
} from "./interfaces/updateAccountPassword.interface";
import { UpdateAccountPasswordUseCase } from "./UpdateAccountPasswordUseCase";

export class UpdateAccountPasswordController {
  async handle(
    request: Request,
    response: Response
  ): Promise<iUpdateAccountPasswordResponse> {
    const passwordInfo = request.body as iUpdateAccountPassword;

    return await new UpdateAccountPasswordUseCase().resolve(passwordInfo);
  }
}
