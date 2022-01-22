import { CustomerEntity } from '../entities/customer.entity';
import { Customer } from '../model/customer';
import { CustomerRepository } from '../repositories/customer.repository';

export class CustomerController {
  constructor(private _customerRepository: CustomerRepository) {}

  async find(customerId: string): Promise<CustomerEntity> {
    return this._customerRepository.find(customerId);
  }

  async add(customer: Customer): Promise<void> {
    this._customerRepository.insert(customer);
  }

  async search(query: string): Promise<CustomerEntity[]> {
    return this._customerRepository.search(query);
  }

  async update(customerId: string, customer: Customer): Promise<void> {
    return this._customerRepository.update(customerId, customer);
  }

  async remove(customerId: string): Promise<void> {
    return await this._customerRepository.delete(customerId);
  }
}
