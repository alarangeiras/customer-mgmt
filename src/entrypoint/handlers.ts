import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';
import { ApiError } from '../errors/api.error';
import { BadRequest } from '../errors/bad-request.error';
import { makeCustomerControllerFactory } from '../main/factories/controllers/make-customer-controllers.factory';
import { Customer } from '../model/customer';

const _customerController = makeCustomerControllerFactory();

export const add: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      throw new BadRequest('body not informed');
    }

    await _customerController.add(JSON.parse(event.body as string) as Customer);
  } catch (error) {
    return _handleErrors(error);
  }

  return _handleResponse(201, 'the customer was created sucefully');
};

export const search: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    const queryStringParameters = event.queryStringParameters;
    if (!queryStringParameters || !queryStringParameters['term']) {
      throw new BadRequest('term not informed');
    }
    const term = queryStringParameters['term'];
    const result = await _customerController.search(term as string);
    return _handleResponse(200, JSON.stringify(result));
  } catch (error) {
    return _handleErrors(error);
  }
};

export const find: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    const pathParameters = event.pathParameters;
    if (!pathParameters || !pathParameters['customerId']) {
      throw new BadRequest('customerId not informed');
    }
    const customerId = pathParameters['customerId'];
    const result = await _customerController.find(customerId);
    return _handleResponse(200, JSON.stringify(result));
  } catch (error) {
    return _handleErrors(error);
  }
};

export const update: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    const pathParameters = event.pathParameters;
    if (!pathParameters || !pathParameters['customerId']) {
      throw new BadRequest('customerId not informed');
    }
    if (!event.body) {
      throw new BadRequest('body not informed');
    }
    const customerId = pathParameters['customerId'];
    await _customerController.update(
      customerId,
      JSON.parse(event.body as string) as Customer,
    );
    return _handleResponse();
  } catch (error) {
    return _handleErrors(error);
  }
};

export const remove: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    const pathParameters = event.pathParameters;
    if (!pathParameters || !pathParameters['customerId']) {
      throw new BadRequest('customerId not informed');
    }
    const customerId = pathParameters['customerId'];
    await _customerController.remove(customerId);
    return _handleResponse();
  } catch (error) {
    return _handleErrors(error);
  }
};

function _handleErrors(error): APIGatewayProxyResult {
  if (error.statusCode) {
    const apiError = error as ApiError;
    return {
      statusCode: apiError.statusCode,
      body: apiError.message,
    };
  }

  return {
    statusCode: 500,
    body: error.message,
  };
}

function _handleResponse(statusCode = 204, body = ''): APIGatewayProxyResult {
  return {
    statusCode,
    body,
  };
}
