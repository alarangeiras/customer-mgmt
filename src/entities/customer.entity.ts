import { Customer } from '../model/customer';
import { BaseEntity } from './base.entity';

export type CustomerEntity = BaseEntity & Customer;
