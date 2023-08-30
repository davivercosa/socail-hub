import Authenticate from "../middlewares/Authenticate";
import VerifyDTO from "../middlewares/Verify.DTO";

import { CreateAccountController } from "../modules/account/create/CreateAccountController";
import { createAccountSchema } from "../modules/account/create/dtos/createAccount.dto";

import { LoginAccountController } from "../modules/account/login/LoginAccountController";
import { loginAccountSchema } from "../modules/account/login/dtos/loginAccount.dtos";

import { UpdateAccountPasswordController } from "../modules/account/password/update/UpdateAccountPasswordController";
import { updateAccountPasswordSchema } from "../modules/account/password/update/dtos/updateAccountPassword.dto";

import { UpdateAccountController } from "../modules/account/update/UpdateAccountController";
import { updateAccountSchema } from "../modules/account/update/dtos/updateAccount.dto";

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

    {
      method: "put",
      route: "/",
      controller: UpdateAccountController,
      action: "handle",
      middlewares: [Authenticate, VerifyDTO(updateAccountSchema)],
    },

    {
      method: "put",
      route: "/password",
      controller: UpdateAccountPasswordController,
      action: "handle",
      middlewares: [Authenticate, VerifyDTO(updateAccountPasswordSchema)],
    },
  ],
};
