import Joi from "joi";

const updatePostSchema = Joi.object({
  id_post: Joi.number().required(),
  content: Joi.string().strip().max(5000).required(),
});

export { updatePostSchema };
