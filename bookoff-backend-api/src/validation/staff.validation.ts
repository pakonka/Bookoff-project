import Joi from "joi";
export const createStaff = {
  body: Joi.object().keys({
    first_name: Joi.string().min(4).required(),
    last_name: Joi.string().min(4).required(),
    email: Joi.string().email().lowercase().required(),
    phone: Joi.string().min(10).max(10).required(),
    active: Joi.valid(true, false).optional(),
    address: Joi.string().required(),
    password: Joi.string().min(6).required(),
  }),
};
