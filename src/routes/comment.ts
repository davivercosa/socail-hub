import Authenticate from "../middlewares/Authenticate";
import VerifyDTO from "../middlewares/Verify.DTO";

import { CreateCommentController } from "../modules/comment/create/CreateCommentController";
import { createCommentSchema } from "../modules/comment/create/dtos/createComment.dto";

export default {
  path: "/comment",
  routes: [
    {
      method: "post",
      route: "/",
      controller: CreateCommentController,
      action: "handle",
      middlewares: [Authenticate, VerifyDTO(createCommentSchema)],
    },
  ],
};
