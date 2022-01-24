import { Client } from '@elastic/elasticsearch';
import { CustomerRepository } from './customer.repository';
import { createMock } from 'ts-auto-mock';
import { Customer } from '../model/customer';
describe(__filename, () => {
  let _customerRepository: CustomerRepository;
  let _client: Client;
  beforeEach(() => {
    _client = createMock<Client>();
    _customerRepository = new CustomerRepository(_client);
  });
  describe('find', () => {
    it('should find one result', async () => {
      const customer = {
        firstName: 'firstName',
        lastName: 'lastName',
        address: 'address',
      };
      _client.get = jest.fn().mockResolvedValue({
        statusCode: 200,
        body: {
          _id: '1',
          _source: customer,
        },
      });
      const id = '1';
      const response = await _customerRepository.find(id);
      expect(_client.get).toBeCalled();
      expect(response.id).toBe(id);
    });
    it('should not find result', async () => {
      _client.get = jest.fn().mockResolvedValue({
        statusCode: 404,
      });
      const id = '1';
      try {
        await _customerRepository.find(id);
      } catch (error) {
        expect(error).not.toBeNull;
      }
      expect(_client.get).toBeCalled();
    });
    it('should not find result 404', async () => {
      _client.get = jest.fn().mockRejectedValue({
        statusCode: 404,
      });
      const id = '1';
      try {
        await _customerRepository.find(id);
      } catch (error) {
        expect(error).not.toBeNull;
      }
      expect(_client.get).toBeCalled();
    });
    it('should throw a error', async () => {
      _client.get = jest.fn().mockRejectedValue(new Error());
      const id = '1';
      try {
        await _customerRepository.find(id);
      } catch (error) {
        expect(error).not.toBeNull;
      }
      expect(_client.get).toBeCalled();
    });
  });
  describe('insert', () => {
    it('should insert a new customer', async () => {
      _client.index = jest.fn().mockResolvedValue({
        statusCode: 201,
      });
      const customer: Customer = {
        firstName: 'firstName',
        lastName: 'lastName',
        address: 'address',
      };
      await _customerRepository.insert(customer);
      expect(_client.index).toBeCalled();
    });
    it('should not insert a customer', async () => {
      _client.index = jest.fn().mockResolvedValue({
        statusCode: 400,
      });
      const customer: Customer = {
        firstName: 'firstName',
        lastName: 'lastName',
        address: 'address',
      };
      try {
        await _customerRepository.insert(customer);
      } catch (error) {
        expect(error).not.toBeNull;
      }
      expect(_client.index).toBeCalled();
    });
    it('should throw a error', async () => {
      _client.index = jest.fn().mockRejectedValue(null);
      const customer: Customer = {
        firstName: 'firstName',
        lastName: 'lastName',
        address: 'address',
      };
      try {
        await _customerRepository.insert(customer);
      } catch (error) {
        expect(error).not.toBeNull;
      }
      expect(_client.index).toBeCalled();
    });
  });
  describe('update', () => {
    it('should update a customer', async () => {
      _client.update = jest.fn().mockResolvedValue({
        statusCode: 200,
      });
      const customer: Customer = {
        firstName: 'firstName',
        lastName: 'lastName',
        address: 'address',
      };
      const id = '1';
      await _customerRepository.update(id, customer);
      expect(_client.update).toBeCalled();
    });
    it('should not update a customer because it doesnt exists', async () => {
      _client.update = jest.fn().mockResolvedValue({
        statusCode: 404,
      });
      const customer: Customer = {
        firstName: 'firstName',
        lastName: 'lastName',
        address: 'address',
      };
      const id = '1';
      try {
        await _customerRepository.update(id, customer);
      } catch (error) {
        expect(error).not.toBeNull;
      }
      expect(_client.update).toBeCalled();
    });
    it('should throw a error', async () => {
      _client.update = jest.fn().mockRejectedValue(null);
      const customer: Customer = {
        firstName: 'firstName',
        lastName: 'lastName',
        address: 'address',
      };
      const id = '1';
      try {
        await _customerRepository.update(id, customer);
      } catch (error) {
        expect(error).not.toBeNull;
      }
      expect(_client.update).toBeCalled();
    });
  });
  describe('delete', () => {
    it('should delete a customer', async () => {
      _client.delete = jest.fn().mockResolvedValue({
        statusCode: 200,
      });
      const id = '1';
      await _customerRepository.delete(id);
      expect(_client.delete).toBeCalled();
    });
    it('should not delete a customer becasuse it doents exists', async () => {
      _client.delete = jest.fn().mockResolvedValue({
        statusCode: 404,
      });
      const id = '1';
      try {
        await _customerRepository.delete(id);
      } catch (error) {
        expect(error).not.toBeNull;
      }
      expect(_client.delete).toBeCalled();
    });
    it('should throw a error', async () => {
      _client.delete = jest.fn().mockRejectedValue(null);
      const id = '1';
      try {
        await _customerRepository.delete(id);
      } catch (error) {
        expect(error).not.toBeNull;
      }
      expect(_client.delete).toBeCalled();
    });
  });
  describe('search', () => {
    it('should find zero results', async () => {
      _client.search = jest.fn().mockResolvedValue({
        statusCode: 200,
        body: {
          hits: {
            hits: [],
          },
        },
      });
      const response = await _customerRepository.search('query');
      expect(_client.search).toBeCalled();
      expect(response.length).toBe(0);
    });
    it('should find any results', async () => {
      _client.search = jest.fn().mockResolvedValue({
        statusCode: 200,
        body: {
          hits: {
            hits: [
              {
                firstName: 'firstName',
                lastName: 'lastName',
                address: 'address',
              },
            ],
          },
        },
      });
      const response = await _customerRepository.search('query');
      expect(_client.search).toBeCalled();
      expect(response.length).toBeGreaterThan(0);
    });
    it('should throw a error', async () => {
      _client.search = jest.fn().mockRejectedValue(null);
      try {
        await _customerRepository.search('query');
      } catch (error) {
        expect(error).not.toBeNull;
      }
      expect(_client.search).toBeCalled();
    });
  });
});
