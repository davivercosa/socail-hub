import Joi from "joi";

const updateAccountSchema = Joi.object({
  id_account: Joi.number().required(),
  username: Joi.string().strip().max(50).required(),
  bio: Joi.string().strip().max(500).required(),
  phone: Joi.string().strip().max(11).required(),
});

export { updateAccountSchema };
