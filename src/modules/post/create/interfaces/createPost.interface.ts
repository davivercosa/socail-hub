import { iApiResponse } from "../../../../shared/interfaces/response.interface";

export interface iCreatePost {
  content: string;
}

export interface iCreatePostResponse extends iApiResponse {}
