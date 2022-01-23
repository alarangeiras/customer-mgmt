import type { AWS } from '@serverless/typescript';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

const accountNumber = process.env.AWS_ACCOUNT_NUMBER;
const env = process.env.NODE_ENV;

const serverlessConfiguration: AWS = {
  service: 'customer-mngmt',
  frameworkVersion: '2',
  plugins: [
    'serverless-plugin-typescript',
    'serverless-offline',
    'serverless-plugin-tracing',
  ],
  useDotenv: true,
  provider: {
    name: 'aws',
    stage: 'prod',
    lambdaHashingVersion: '20201221',
    runtime: 'nodejs14.x',
    tracing: {
      apiGateway: true,
      lambda: true,
    },
    region: 'us-east-1',
    vpc: {
      subnetIds: ['subnet-58574a3f'],
      securityGroupIds: ['sg-c49172ec'],
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              'xray:PutTraceSegments',
              'xray:PutTelemetryRecords',
              'logs:CreateLogGroup',
              'logs:CreateLogStream',
              'logs:PutLogEvents',
              'es:ESHttpGet',
              'es:ESHttpPut',
              'es:ESHttpPost',
              'es:ESHttpDelete',
            ],
            Resource: [
              `arn:aws:lambda:us-east-1:${accountNumber}:function:customer-mngmt-*`,
            ],
          },
        ],
      },
    },
    environment: {
      ELASTICSEARCH_URI:
        env === 'dev'
          ? (process.env.ELASTICSEARCH_URI as string)
          : 'https://vpc-allanlarangeiras-ss4sdrvqa3zhbov5h4ne3225x4.us-east-1.es.amazonaws.com/',
    },
  },
  functions: {
    add: {
      handler: 'src/entrypoint/handlers.add',
      events: [
        {
          httpApi: {
            path: '/',
            method: 'post',
          },
        },
      ],
      tracing: true,
    },
    search: {
      handler: 'src/entrypoint/handlers.search',
      events: [
        {
          httpApi: {
            path: '/',
            method: 'get',
          },
        },
      ],
      tracing: true,
    },
    find: {
      handler: 'src/entrypoint/handlers.find',
      events: [
        {
          httpApi: {
            path: '/{customerId}',
            method: 'get',
          },
        },
      ],
      tracing: true,
    },
    update: {
      handler: 'src/entrypoint/handlers.update',
      events: [
        {
          httpApi: {
            path: '/{customerId}',
            method: 'put',
          },
        },
      ],
      tracing: true,
    },
    remove: {
      handler: 'src/entrypoint/handlers.delete',
      events: [
        {
          httpApi: {
            path: '/{customerId}',
            method: 'delete',
          },
        },
      ],
      tracing: true,
    },
  },
};

module.exports = serverlessConfiguration;
