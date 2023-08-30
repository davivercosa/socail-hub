import { Request, Response } from "express";
import { AddFollowerUseCase } from "./AddFollowerUseCase";
import {
  iAddFollower,
  iAddFollowerResponse,
} from "./interfaces/addFollower.interface";

export class AddFollowerController {
  async handle(
    request: Request,
    response: Response
  ): Promise<iAddFollowerResponse> {
    const followedAccountInfo = request.body as iAddFollower;

    const followerId = request.user.id;

    return await new AddFollowerUseCase().resolve(
      followedAccountInfo,
      followerId
    );
  }
}
