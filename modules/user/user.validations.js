const Joi = require("joi");
const { MESSAGES } = require("../../configs");

exports.userLoginSchema = {
  body: Joi.object().keys({
    email: Joi.string().trim().lowercase().email().required(),
    password: Joi.string()
      .trim()
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/)
      .required(),
  }),
};

exports.userSignupSchema = {
  body: Joi.object().keys({
    firstName: Joi.string()
      .allow(null)
      .trim()
      .required()
      .regex(/^[A-Za-z0-9 ]+$/)
      .label("firstName")
      .messages({
        "string.pattern.base": MESSAGES.USER.firstNameValidate,
      }),
    lastName: Joi.string()
      .allow(null)
      .trim()
      .required()
      .regex(/^[A-Za-z0-9 ]+$/)
      .label("lastName")
      .messages({
        "string.pattern.base": MESSAGES.USER.lastNameValidate,
      }),
    role: Joi.string()
      .allow(null)
      .trim()
      .required()
      .regex(/^[A-Za-z0-9 ]+$/)
      .label("role")
      .messages({
        "string.pattern.base": MESSAGES.USER.lastNameValidate,
      }),

    email: Joi.string().allow(null).trim().lowercase().email().required(),
    password: Joi.string()
      .trim()
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/)
      .required(),
    phone: Joi.string()
      .allow(null)
      .trim()
      .max(15)
      .min(10)
      .pattern(/^[0-9]+$/),
  }),
};

exports.getUserByIdSchema = {
  params: Joi.object().keys({
    userId: Joi.number().required(),
  }),
};

exports.getUsersSchema = {
  query: Joi.object().keys({
    search: Joi.string().trim().optional(),
    page: Joi.number().required(),
    items: Joi.number().required(),
    filter: Joi.optional(),
  }),
};

exports.verifyTokenSchema = {
  body: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

exports.verifyEmailSchema = {
  body: Joi.object().keys({
    email: Joi.string().trim().lowercase().email().required(),
  }),
};
