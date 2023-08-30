import Joi from "joi";

const addFollowerSchema = Joi.object({
  account_id: Joi.number().required(),
});

export { addFollowerSchema };
