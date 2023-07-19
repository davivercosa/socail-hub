import { iApiResponse } from "../../../../shared/interfaces/response.interface";

export interface iLoginAccount {
  username: string;
  password: string;
}

export interface iLoginAccountResponse extends iApiResponse {}
