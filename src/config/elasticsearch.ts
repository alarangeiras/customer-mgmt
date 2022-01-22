import { Client } from '@elastic/elasticsearch';

export default function init(): Client {
  return new Client({ node: process.env.ELASTICSEARCH_URI });
}
