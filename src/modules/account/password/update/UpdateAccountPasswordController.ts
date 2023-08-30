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
    const password = request.body as iUpdateAccountPassword;

    const userId = request.user.id;

    return await new UpdateAccountPasswordUseCase().resolve(password, userId);
  }
}
