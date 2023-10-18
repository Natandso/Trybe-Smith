import { NextFunction, Response, Request } from 'express';
import Joi from 'joi';

const schemas = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.string().min(3).required(),
  orderId: Joi.number(),
}).messages({
  'any.string': '{{#label}} must be a string',
  'any.min': '{{#label}} length must be at least 3 characters long',
  'any.required': '{{#label}} is required',

});

const validations = (req: Request, res: Response, next: NextFunction): Response | void => {
  const validate = schemas.validate(req.body);

  if (validate.error) {
    const HTTPstatus = validate.error.details[0].type === 'any.required' ? 400 : 422;
    return res.status(HTTPstatus).json({ message: validate.error.message });
  }
  next();
};

export default {
  validations,
};