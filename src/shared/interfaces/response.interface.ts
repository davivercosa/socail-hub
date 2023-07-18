type ResponseStatus = "success" | "error";

export interface iApiResponse {
  status: ResponseStatus;
  message: string;
  code: number;
  result?: any;
}
