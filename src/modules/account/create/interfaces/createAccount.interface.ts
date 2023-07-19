import { iApiResponse } from "../../../../shared/interfaces/response.interface";

export interface iCreateAccount {
  username: string;
  password: string;
  bio: string;
  phone: string;
}

export interface iCreateAccountResponse extends iApiResponse {}
