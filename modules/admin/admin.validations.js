const Joi = require("joi");
const { MESSAGES } = require("../../configs");

exports.adminLoginSchema = {
  body: Joi.object().keys({
    email: Joi.string().trim().lowercase().email().required(),
    password: Joi.string()
      .trim()
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/)
      .required(),
  }),
};
