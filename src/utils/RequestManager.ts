import { Request } from "express";
import { Schema } from "joi";
import { iRequestManagerResponse } from "../shared/interfaces/response.interface";

class RequestManager {
  private normalize(body: JSON) {
    let stringBody = JSON.stringify(body);

    for (let index = 0; index < stringBody.length; index++) {
      if (stringBody[index] === ":") {
        const startOfKeyIndex = stringBody.lastIndexOf('"', index - 2) + 1;
        const endOfKeyIndex = index - 2;

        let key = "";
        let keyUpper = "";

        for (let index = startOfKeyIndex; index <= endOfKeyIndex; index++) {
          key += stringBody[index];
          keyUpper += stringBody[index].toUpperCase();
        }

        stringBody = stringBody.replace(
          `"${key}":`,
          `"${this.unidecode(keyUpper.split(" ").join(""))}":`
        );
      }
    }

    return JSON.parse(stringBody);
  }

  private unidecode(string: string): string {
    return string
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  verify(request: Request, schema: Schema): iRequestManagerResponse {
    const normalizedRequestBody = this.normalize(request.body);

    const { error } = schema.validate(normalizedRequestBody);

    if (error) {
      return { status: "error", message: error };
    }

    const message = normalizedRequestBody;

    return { status: "success", message };
  }
}

export default new RequestManager();
