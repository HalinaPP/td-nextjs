import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, BatchWriteCommand } from '@aws-sdk/lib-dynamodb';
import productsMockData from '../data/mock.json';
import { productsTableName, stocksTableName } from '../constants';

const dynamoClient = new DynamoDBClient({
  region: REGION
})

const marshallOptions = {
  convertEmptyValues: false,
  removeUndefinedValues: false,
  convertClassInstanceToMap: false,
}

const unmarshallOptions = {
  wrapNumbers: false,
}

const documentClient = DynamoDBDocumentClient.from(dynamoClient, {
  marshallOptions,
  unmarshallOptions,
})

const productsRequest = productsMockData.map((product) => ({
  PutRequest: {
    Item: product,
  },
}))

const stockRequest = productsMockData.map(({ id, count }) => ({
  PutRequest: {
    Item: {
      product_id: id,
      count,
    },
  },
}))

await documentClient
  .send(new BatchWriteCommand({ RequestItems: { [productsTableName]: productsRequest, [stocksTableName]: stockRequest } }));
