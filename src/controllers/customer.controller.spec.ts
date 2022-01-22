import { createMock } from 'ts-auto-mock';
import { CustomerEntity } from '../entities/customer.entity';
import { Customer } from '../model/customer';
import { CustomerRepository } from '../repositories/customer.repository';
import { CustomerController } from './customer.controller';

describe(__dirname, () => {
  let _customerController: CustomerController;
  let _customerRepository: CustomerRepository;
  beforeEach(() => {
    _customerRepository = createMock<CustomerRepository>();
    _customerController = new CustomerController(_customerRepository);
  });

  describe('find', () => {
    it('should return repository result', async () => {
      const customerEntity: CustomerEntity = {
        id: '1',
        firstName: 'firstName',
        lastName: 'lastName',
        address: 'address',
      };
      _customerRepository.find = jest.fn().mockResolvedValue(customerEntity);
      const result = await _customerController.find('1');
      expect(result).toBe(customerEntity);
      expect(_customerRepository.find).toBeCalled;
    });
  });
  describe('add', () => {
    it('should return repository result', async () => {
      _customerRepository.insert = jest.fn().mockResolvedValue(null);
      const customer: Customer = {
        firstName: 'firstName',
        lastName: 'lastName',
        address: 'address',
      };
      await _customerController.add(customer);
      expect(_customerRepository.insert).toBeCalled;
    });
  });
  describe('update', () => {
    it('should return repository result', async () => {
      const id = '1';
      const customer: Customer = {
        firstName: 'firstName',
        lastName: 'lastName',
        address: 'address',
      };
      _customerRepository.update = jest.fn().mockResolvedValue(null);
      await _customerController.update(id, customer);
      expect(_customerRepository.update).toBeCalled;
    });
  });
  describe('remove', () => {
    it('should remove a customer', async () => {
      const id = '1';
      _customerRepository.delete = jest.fn().mockResolvedValue(null);
      await _customerController.remove(id);
      expect(_customerRepository.delete).toBeCalled;
    });
  });
  describe('search', () => {
    it('should return repository result', async () => {
      const customerEntity: CustomerEntity = {
        id: '1',
        firstName: 'firstName',
        lastName: 'lastName',
        address: 'address',
      };
      const customers = [customerEntity];
      _customerRepository.search = jest.fn().mockResolvedValue(customers);
      const result = await _customerController.search('query');
      expect(result).toBe(customers);
      expect(_customerRepository.search).toBeCalled;
    });
  });
});
