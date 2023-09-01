import { Request, Response } from "express";

import { AddRemoveFollowerUseCase } from "./AddRemoveFollowerUseCase";

import {
  iAddRemoveFollower,
  iAddRemoveFollowerResponse,
} from "./interfaces/addRemoveFollower.interface";

export class AddRemoveFollowerController {
  async handle(
    request: Request,
    response: Response
  ): Promise<iAddRemoveFollowerResponse> {
    const followingInfo = request.body as iAddRemoveFollower;

    const accountId = request.user.id;

    return await new AddRemoveFollowerUseCase().resolve(
      followingInfo,
      accountId
    );
  }
}
