import { iApiResponse } from "../../../../shared/interfaces/response.interface";

export interface iAddRemoveFollower {
  following_id: number;
}

export interface iAddRemoveFollowerResponse extends iApiResponse {}
