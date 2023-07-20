import Joi from "joi";

const updateAccountPasswordSchema = Joi.object({
  id_account: Joi.number().required(),
  password: Joi.string().strip().max(100).required(),
});

export { updateAccountPasswordSchema };
