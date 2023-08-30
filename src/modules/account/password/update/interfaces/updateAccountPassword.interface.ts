import { iApiResponse } from "../../../../../shared/interfaces/response.interface";

export interface iUpdateAccountPassword {
  password: string;
}

export interface iUpdateAccountPasswordResponse extends iApiResponse {}
