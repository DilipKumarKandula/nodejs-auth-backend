// src/middleware/validation.middleware.js

const Joi = require("joi");

/**
 * Generic validation middleware
 * @param {Joi.Schema} schema
 */
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const err = new Error(error.details[0].message);
      err.statusCode = 400;
      return next(err); // 🔥 SAME pattern as your auth middleware
    }

    next();
  };
};


// 🔐 Register schema
const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});


// 🔐 Login schema
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});


module.exports = {
  validate,
  registerSchema,
  loginSchema,
};