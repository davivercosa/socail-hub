import Joi from "joi";

const addRemoveFollowerSchema = Joi.object({
  following_id: Joi.number().required(),
});

export { addRemoveFollowerSchema };
