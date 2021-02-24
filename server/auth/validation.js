const Joi = require('@hapi/joi');

const creationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().min(6).email().required(),
  password: Joi.string().min(6).required(),
  type: Joi.string().required(),
});

const validateCreate = (body) => creationSchema.validate(body);

const clientCreationSchema = Joi.object({
  name: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  email: Joi.string().min(6).email().required(),
});

const validateClientCreate = (body) => clientCreationSchema.validate(body);

module.exports = { validateCreate, validateClientCreate };
