import { iApiResponse } from "../../../../shared/interfaces/response.interface";

export interface iUpdateAccount {
  id_account: number;
  username: string;
  bio: string;
  phone: string;
}

export interface iUpdateAccountResponse extends iApiResponse {}
