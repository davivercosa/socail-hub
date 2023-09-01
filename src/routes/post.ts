import Authenticate from "../middlewares/Authenticate";
import VerifyDTO from "../middlewares/Verify.DTO";

import { CreatePostController } from "../modules/post/create/CreatePostController";
import { createPostSchema } from "../modules/post/create/dtos/createPost.dto";

import { UpdatePostController } from "../modules/post/update/UpdatePostController";
import { updatePostSchema } from "../modules/post/update/dtos/updatePost.dto";

import { DeletePostController } from "../modules/post/delete/DeletePostController";
import { deletePostSchema } from "../modules/post/delete/dtos/deletePost.dto";

export default {
  path: "/post",
  routes: [
    {
      method: "post",
      route: "/",
      controller: CreatePostController,
      action: "handle",
      middlewares: [Authenticate, VerifyDTO(createPostSchema)],
    },

    {
      method: "put",
      route: "/",
      controller: UpdatePostController,
      action: "handle",
      middlewares: [Authenticate, VerifyDTO(updatePostSchema)],
    },

    {
      method: "delete",
      route: "/",
      controller: DeletePostController,
      action: "handle",
      middlewares: [Authenticate, VerifyDTO(deletePostSchema)],
    },
  ],
};
