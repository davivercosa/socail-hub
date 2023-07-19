import VerifyDTO from "../middlewares/Verify.DTO";
import { CreateAccountController } from "../modules/account/create/CreateAccountController";
import { createAccountSchema } from "../modules/account/create/dtos/createAccount.dto";

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
  ],
};
