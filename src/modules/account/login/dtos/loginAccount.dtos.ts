import Joi from "joi";

const loginAccountSchema = Joi.object({
  username: Joi.string().strip().max(50).required(),
  password: Joi.string().strip().max(100).required(),
});

export { loginAccountSchema };
