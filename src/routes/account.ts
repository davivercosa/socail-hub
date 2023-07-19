import { CreateAccountController } from "../modules/account/create/CreateAccountController";

export default {
  path: "/account",
  routes: [
    {
      method: "post",
      route: "/",
      controller: CreateAccountController,
      action: "handle",
      middlewares: [],
    },
  ],
};
