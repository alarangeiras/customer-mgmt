import { Customer, customerSchema } from '../model/customer';
import { ValidationUtil } from './validation.util';
describe(__filename, () => {
  describe('validate', () => {
    it('should validate successfully', async () => {
      const object = {
        firstName: 'firstName',
        lastName: 'lastName',
        address: 'address',
      };
      await ValidationUtil.validate(customerSchema, object);
    });
    it('should should throw error', async () => {
      const object = {
        firstName: 'firstName',
        lastName: 'lastName',
      };
      try {
        await ValidationUtil.validate(customerSchema, object);
        throw new Error('should fail here');
      } catch (error) {
        expect(error).not.toBeNull();
      }
    });
  });
  describe('parseJson', () => {
    it('should parse json successfully', async () => {
      const customer = await ValidationUtil.parseJson<Customer>(`
        {
          "firstName": "firstName",
          "lastName": "lastName",
          "address": "address"
        }
      `);
      expect(customer).not.toBeNull();
    });
    it('should parse throw error when parsing json', async () => {
      try {
        await ValidationUtil.parseJson<Customer>(`
          {
            "firstName": "firstName",
            "lastName": "lastName",
          }
        `);
        throw new Error('should not reach here');
      } catch (error) {
        expect(error).not.toBeNull();
      }
    });
  });
});
