import Authenticate from "../middlewares/Authenticate";
import VerifyDTO from "../middlewares/Verify.DTO";
import { AddRemoveFollowerController } from "../modules/follower/addRemove/AddRemoveFollowerController";
import { addRemoveFollowerSchema } from "../modules/follower/addRemove/dtos/addRemoveFollower.dto";

export default {
  path: "/follower",
  routes: [
    {
      method: "post",
      route: "/",
      controller: AddRemoveFollowerController,
      action: "handle",
      middlewares: [Authenticate, VerifyDTO(addRemoveFollowerSchema)],
    },
  ],
};
