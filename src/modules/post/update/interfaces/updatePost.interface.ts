import { iApiResponse } from "../../../../shared/interfaces/response.interface";

export interface iUpdatePost {
  id_post: number;
  content: string;
}

export interface iUpdatePostResponse extends iApiResponse {}
