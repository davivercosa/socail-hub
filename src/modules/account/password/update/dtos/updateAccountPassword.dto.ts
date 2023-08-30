import Joi from "joi";

const updateAccountPasswordSchema = Joi.object({
  password: Joi.string().strip().max(100).required(),
});

export { updateAccountPasswordSchema };
