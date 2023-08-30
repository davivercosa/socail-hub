import Joi from "joi";

const updateAccountSchema = Joi.object({
  username: Joi.string().strip().max(50).optional(),
  bio: Joi.string().strip().max(500).optional(),
  phone: Joi.string().strip().max(11).optional(),
});

export { updateAccountSchema };
