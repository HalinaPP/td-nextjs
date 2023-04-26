import { v4 as uuidv4 } from 'uuid';
import { errorResponse } from '../../../aws/shop-cloudfront-be/product-service/src/errors-hadler';
import { db } from '../../../aws/shop-cloudfront-be/product-service/handler';
import { Product, ProductWithCount } from '../../../aws/shop-cloudfront-be/product-service/src/models/product';
import { productsTableName, stocksTableName } from '../../../aws/shop-cloudfront-be/product-service/src/constants';
import { Stock } from '../../../aws/shop-cloudfront-be/product-service/src/models/stock';

const isEmptyResult = (queryResult) => {
  return !queryResult || !queryResult.Items || !queryResult.Items[0];
};

const getItem = async (
  tableName: string,
  keyName: string,
  keyValue: string
) => {
  const params = {
    TableName: tableName,
    KeyConditionExpression: `${keyName} = :${keyName}`,
    ExpressionAttributeValues: {
      [`:${keyName}`]: keyValue
    },
    Limit: 1
  };

  const queryResult = await db.query(params).promise();

  if (isEmptyResult(queryResult)) {
    errorResponse(404, 'Product not found');
  }

  return queryResult!.Items![0];
};

export const getProducts = async () => {
  const products = await db
    .scan({
      TableName: productsTableName
    })
    .promise();

  if (!products) {
    errorResponse(404, 'Products not found');
  }

  const productsWithStockData = await Promise.allSettled(
    products!.Items!.map(async (item) => {
      const stocks = await getItem(stocksTableName, 'product_id', item.id);

      return {
        ...item,
        count: stocks.count
      };
    })
  );

  const fulfilledProducts = productsWithStockData
    .map((entry) => (entry.status === 'fulfilled' ? entry.value : null))
    .filter((entry) => entry !== null);

  return fulfilledProducts;
};

export const getOneProduct = async (id: string): Promise<ProductWithCount> => {
  const product = (await getItem(productsTableName, 'id', id)) as Product;
  const stock = (await getItem(stocksTableName, 'product_id', id)) as Stock;

  console.log('get product:', product);
  console.log('get sock', stock);

  const productById = {
    ...product,
    count: stock.count
  };

  return productById;
};

const addItem = (tableName: string, data: object) => {
  const params = {
    TableName: tableName,
    Item: {
      ...data
    }
  };

  //await db.put(params).promise();
  return { Put: { ...params } };
};

export const addProduct = async (
  data: ProductWithCount
): Promise<ProductWithCount> => {
  const id = uuidv4();
  console.log('data:', data);

  const { count, ...productData } = data;

  console.log('count:', count);
  productData.id = id;

  /*  const productParams = {
      TableName: productsTableName,
      Item: {
        ...productData
      }*/
  const stockData = { product_id: id, count };

  //const putProductItem = addItem(productsTableName, productData);
  //const putStockItem = addItem(stocksTableName, stockData);

  //console.log('pro=', putProductItem, ' st=', putStockItem);

  /*const transact = await db.transactWrite({
    TransactItems: [{ ...putProductItem }, { ...putStockItem }]
  });*/
  const transact = await db.transactWrite({
    TransactItems: [
      {
        Put: {
          TableName: productsTableName,
          Item: {
            ...productData
          }
        }
      },
      {
        Put: {
          TableName: stocksTableName,
          Item: {
            ...stockData
          }
        }
      }
    ]
  });

  console.log('after transaction:');//, transact);
  const product = await getOneProduct(id);
  return product;
};
