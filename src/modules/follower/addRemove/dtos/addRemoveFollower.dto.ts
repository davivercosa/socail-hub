import Joi from "joi";

const addRemoveFollowerSchema = Joi.object({
  account_id: Joi.number().required(),
});

export { addRemoveFollowerSchema };
