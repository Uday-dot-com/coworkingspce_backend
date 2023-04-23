const Joi = require("joi");

exports.locationCreateSchema = {
  body: Joi.object().keys({
    address: Joi.string().required(),
    city: Joi.string().required(),
    location: Joi.string().required(),
    pincode: Joi.number().required(),
    office_id: Joi.string().optional(),
  }),
};

exports.getAllLocationsSchema = {
  query: Joi.object().keys({
    search: Joi.string().trim().optional(),
    page: Joi.number().required(),
    items: Joi.number().required(),
    filter: Joi.optional(),
  }),
};

exports.getLocationSchema = {
  params: Joi.object().keys({
    id: Joi.number().integer().allow(null).required(),
  }),
};

exports.updateLocationSchema = {
  body: Joi.object().keys({
    address: Joi.string().required(),
    city: Joi.string().required(),
    location: Joi.string().required(),
    pincode: Joi.number().required(),
    office_id: Joi.string().optional(),
  }),
  params: Joi.object().keys({
    id: Joi.number().integer().allow(null).required(),
  }),
};
