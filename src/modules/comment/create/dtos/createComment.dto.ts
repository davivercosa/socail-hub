import Joi from "joi";

const createCommentSchema = Joi.object({
  content: Joi.string().strip().max(5000).required(),
  post_id: Joi.number().required(),
});

export { createCommentSchema };
