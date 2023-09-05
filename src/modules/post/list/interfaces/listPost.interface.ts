import { iApiResponse } from "../../../../shared/interfaces/response.interface";

export interface iListPostResponse extends iApiResponse {
  result?: iListPostResult[];
}

export interface iPostInfo {
  id_comment: number;
  comment_content: string;
  comment_created_at: Date;
  comment_account_id: number;
  comment_account_username: string;
  comment_account_profile_picture: string | null;
  id_post: number;
  content: string;
  created_at: Date;
  id_account: number;
  account_profile_picture: string | null;
  account_username: string;
}

export interface iListPostResult {
  id_post: number;
  content: string;
  created_at: Date;
  id_account: number;
  account_profile_picture: string | null;
  account_username: string;
  comments: {
    id_comment: number;
    content: string;
    created_at: Date;
    account_id: number;
    account_username: string;
    account_profile_picture: string | null;
  }[];
}
