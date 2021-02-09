const Joi = require('@hapi/joi');

const creationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().min(6).email().required(),
  password: Joi.string().min(6).required(),
});

const validateCreate = (body) => creationSchema.validate(body);

module.exports = { validateCreate };
