import Joi from "joi";

const deletePostSchema = Joi.object({
  id_post: Joi.number().required(),
});

export { deletePostSchema };
