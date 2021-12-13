const {
  connect,
  findAll,
  insert
} = require('../../service/mongo.service');

const { MONGO_CONNECTION_STRING, MONGO_DB, TABLE_PRODUCT } = require("../../config/mongo.config");

const product = `
    type Product {
      productName: String
      productDetail: String
      deliveryFee: String
      totalNumber: Int
    }
    type Query {
      products: [Product],
    }
    type Mutation {
      insert(productName: String, productDetail: String, deliveryFee: String, totalNumber: Int): Boolean
    }
`;

const fakeList = [
  {
    productName: 'motobike',
    productDetail: 'Kawasaki Z1000',
    deliveryFee: '50',
    totalNumber: 2,
  },
  {
    productName: 'motobike',
    productDetail: 'Kawasaki Zx10',
    deliveryFee: '25',
    totalNumber: 1,
  },
];

//resolvers
const getProducts = async function () {
  //from the fewest total number to the greates number
  try {
    let db = await connect(MONGO_CONNECTION_STRING, MONGO_DB);
    let tList = await findAll(db, TABLE_PRODUCT);
    return tList.sort((first, second) => first.totalNumber - second.totalNumber);
  } catch (e) {
    return [];
  }
}

const insertNew = async function (productName, productDetail, deliveryFee, totalNumber) {
  //return fakeList.push(product);
  try {
    let db = await connect(MONGO_CONNECTION_STRING, MONGO_DB);
    await insert(db, TABLE_PRODUCT, {
      productName, productDetail, deliveryFee, totalNumber
    });
    return true;
  } catch (e) {
    return false;
  }
}

var productResolvers = {
  Query: {
    products: getProducts
  },
  Mutation: {
    insert: insertNew,
  }
};

module.exports = {
  product,
  productResolvers
}