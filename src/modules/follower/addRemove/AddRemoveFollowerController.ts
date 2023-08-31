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
    const followedAccountInfo = request.body as iAddRemoveFollower;

    const followerId = request.user.id;

    return await new AddRemoveFollowerUseCase().resolve(
      followedAccountInfo,
      followerId
    );
  }
}
