import Joi from "joi";

type ResponseStatus = "success" | "error";

export interface iApiResponse {
  status: ResponseStatus;
  message: string;
  code: number;
  result?: any;
}

export interface iRequestManagerResponse {
  status: ResponseStatus;
  message: Joi.ValidationError;
}
