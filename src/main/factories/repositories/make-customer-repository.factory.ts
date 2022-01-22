import { CustomerRepository } from '../../../repositories/customer.repository';
import init from '../../../config/elasticsearch';

export const makeCustomerRepositoryFactory = (): CustomerRepository => {
  return new CustomerRepository(init());
};
