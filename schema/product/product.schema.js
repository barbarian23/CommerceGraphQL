const {
  connect,
  findAll,
  insert
} = require('../../service/mongo.service');

const {
  MONGO_CONNECTION_STRING,
  MONGO_DB,
  TABLE_PRODUCT
} = require("../../config/mongo.config");

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

const insertNew = async function (_, {productName,productDetail,deliveryFee,totalNumber}) {
  try {
    let db = await connect(MONGO_CONNECTION_STRING, MONGO_DB);
    console.log("productName", productName, "productDetail", productDetail, "deliveryFee", deliveryFee, "totalNumber", totalNumber);
    await insert(db, TABLE_PRODUCT, {
      productName: productName,
      productDetail: productDetail,
      deliveryFee: deliveryFee,
      totalNumber: totalNumber
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

const productResolvers = {
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