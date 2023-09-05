import { iApiResponse } from "../../../../shared/interfaces/response.interface";

export interface iCreateComment {
  content: string;
  post_id: number;
}

export interface iCreateCommentResponse extends iApiResponse {}
