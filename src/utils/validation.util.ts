import * as Joi from 'joi';
import { BadRequest } from '../errors/bad-request.error';

export class ValidationUtil {
  static async validate(schema: Joi.ObjectSchema<any>, object: any) {
    try {
      await schema.validateAsync(object);
    } catch (error) {
      throw new BadRequest('Validation Errors', error.details);
    }
  }
  static async parseJson<T>(jsonString: string): Promise<T> {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      throw new BadRequest('Could not parse JSON');
    }
  }
}
