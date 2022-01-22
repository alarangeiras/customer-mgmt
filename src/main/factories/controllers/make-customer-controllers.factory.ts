import { CustomerController } from '../../../controllers/customer.controller';
import { makeCustomerRepositoryFactory } from '../repositories/make-customer-repository.factory';

export const makeCustomerControllerFactory = (): CustomerController => {
  return new CustomerController(makeCustomerRepositoryFactory());
};
