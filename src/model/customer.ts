import * as Joi from 'joi';

export class Customer {
  firstName: string;
  lastName: string;
  address: string;
}

export const customerSchema = Joi.object({
  firstName: Joi.string().required().min(3),
  lastName: Joi.string().required().min(3),
  address: Joi.string().required().min(3),
});
