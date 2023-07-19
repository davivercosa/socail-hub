import VerifyDTO from "../middlewares/Verify.DTO";

import { CreateAccountController } from "../modules/account/create/CreateAccountController";
import { createAccountSchema } from "../modules/account/create/dtos/createAccount.dto";

import { LoginAccountController } from "../modules/account/login/LoginAccountController";
import { loginAccountSchema } from "../modules/account/login/dtos/loginAccount.dtos";

export default {
  path: "/account",
  routes: [
    {
      method: "post",
      route: "/",
      controller: CreateAccountController,
      action: "handle",
      middlewares: [VerifyDTO(createAccountSchema)],
    },

    {
      method: "post",
      route: "/login",
      controller: LoginAccountController,
      action: "handle",
      middlewares: [VerifyDTO(loginAccountSchema)],
    },
  ],
};
