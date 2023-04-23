const Joi = require("joi");

exports.officeCreateSchema = {
  body: Joi.object().keys({
    locationId: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().optional(),
    mobile: Joi.number().optional(),
    logo: Joi.string().optional(),
  }),
};

exports.getAllOfficeSchema = {
  query: Joi.object().keys({
    search: Joi.string().trim().optional(),
    page: Joi.number().required(),
    items: Joi.number().required(),
    filter: Joi.optional(),
  }),
};

exports.getOfficeSchema = {
  params: Joi.object().keys({
    id: Joi.number().integer().allow(null).required(),
  }),
};
