import Joi from "joi";

const createPostSchema = Joi.object({
  content: Joi.string().strip().max(5000).required(),
});

export { createPostSchema };
