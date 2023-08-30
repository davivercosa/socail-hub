import { iApiResponse } from "../../../../shared/interfaces/response.interface";

export interface iUpdateAccount {
  username?: string;
  bio?: string;
  phone?: string;
}

export interface iUpdateAccountResponse extends iApiResponse {}
