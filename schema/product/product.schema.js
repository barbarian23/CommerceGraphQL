const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  buildSchema
} = require('graphql');

const product = buildSchema(`
    type Product {
      productName: String
      productDetail: String
      deliveryFee: String
      totalNumber: Int
    }
    type Query {
      products: [Product]
    }
`);

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

const getProduct = function () {
  //from the fewest total number to the greates number
  return fakeList.sort((first, second) => first.totalNumber - second.totalNumber);;
}

var rootProduct = {
  Query: {
    products: getProduct
  }
};

module.exports = {
  product,
  rootProduct
}