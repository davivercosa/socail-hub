import { iApiResponse } from "../../../../../shared/interfaces/response.interface";

export interface iUpdateAccountPassword {
  id_account: number;
  password: string;
}

export interface iUpdateAccountPasswordResponse extends iApiResponse {}
