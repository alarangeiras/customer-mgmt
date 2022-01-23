import { Client, RequestParams } from '@elastic/elasticsearch';
import { CustomerEntity } from '../entities/customer.entity';
import { NotFoundError } from '../errors/not-found.error';
import { Customer } from '../model/customer';

export class CustomerRepository {
  private _customerIndex = 'customers';

  constructor(private _client: Client) {}

  async find(id: string): Promise<CustomerEntity> {
    const params: RequestParams.Get = {
      index: this._customerIndex,
      id,
    };

    try {
      const result = await this._client.get(params);
      if (result.statusCode === 200 && result.body) {
        return {
          id: result.body._id,
          ...result.body._source,
        } as CustomerEntity;
      }
    } catch (error) {
      throw new Error(error.message);
    }

    throw new NotFoundError();
  }

  async insert(customer: Customer): Promise<void> {
    const params: RequestParams.Index<Customer> = {
      index: this._customerIndex,
      body: customer,
    };

    try {
      const result = await this._client.index(params);
      if (result.statusCode === 201) {
        return;
      }
    } catch (error) {
      throw new Error(error.message);
    }
    throw new Error();
  }

  async update(id: string, customer: Customer): Promise<void> {
    const params: RequestParams.Update = {
      index: this._customerIndex,
      id,
      body: {
        doc: customer,
      },
    };

    try {
      const result = await this._client.update(params);
      if (result.statusCode === 200) {
        return;
      }
    } catch (error) {
      throw new Error(error.message);
    }

    throw new NotFoundError();
  }

  async delete(id: string): Promise<void> {
    const params: RequestParams.Delete = {
      index: this._customerIndex,
      id,
    };

    try {
      const result = await this._client.delete(params);

      if (result.statusCode === 200) {
        return;
      }
    } catch (error) {
      throw new Error();
    }

    throw new NotFoundError();
  }

  async search(query: string): Promise<CustomerEntity[]> {
    const params: RequestParams.Search = {
      index: this._customerIndex,
      size: 10,
      q: query,
    };

    try {
      const result = await this._client.search(params);
      if (result.statusCode === 200 && result.body.hits.hits.length > 0) {
        return result.body.hits.hits.map((item) => {
          return {
            id: item._id,
            ...item._source,
          } as CustomerEntity;
        });
      }
      return [];
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
