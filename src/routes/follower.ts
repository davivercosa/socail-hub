import Authenticate from "../middlewares/Authenticate";
import VerifyDTO from "../middlewares/Verify.DTO";
import { AddFollowerController } from "../modules/follower/add/AddFollowerController";
import { addFollowerSchema } from "../modules/follower/add/dtos/addFollower.dto";

export default {
  path: "/follower",
  routes: [
    {
      method: "post",
      route: "/",
      controller: AddFollowerController,
      action: "handle",
      middlewares: [Authenticate, VerifyDTO(addFollowerSchema)],
    },
  ],
};
