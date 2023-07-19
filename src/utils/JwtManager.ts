import { iApiResponse } from "../shared/interfaces/response.interface";
import { Account } from "../modules/account/entitities/Account.entity";
import jwt, { JsonWebTokenError, Secret } from "jsonwebtoken";

const secret: Secret = process.env.JWT_SECRET;

export class JwtManager {
  create(accountInfo: Account): iApiResponse {
    try {
      const token = jwt.sign(
        {
          id: accountInfo.id_account,
        },
        secret,
        { expiresIn: "1d" }
      );

      return {
        status: "success",
        message: `Login successfully done!`,
        code: 200,
        result: token,
      };
    } catch (error) {
      return { status: "error", message: error.toString(), code: 500 };
    }
  }

  authenticate(token: string): iApiResponse {
    try {
      jwt.verify(token, secret);

      const decodedToken = jwt.decode(token);

      return {
        status: "success",
        message: "User successfully authenticated!",
        code: 200,
        result: decodedToken,
      };
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        if (error.name === "JsonWebTokenError") {
          return {
            status: "error",
            message: "User unauthorized!",
            code: 401,
          };
        }

        if (error.name === "TokenExpiredError") {
          return { status: "error", message: "Token expired!", code: 401 };
        }
      }

      return { status: "error", message: error.toString(), code: 500 };
    }
  }
}
