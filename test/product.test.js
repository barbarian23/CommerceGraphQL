process.env.NODE_ENV = 'test';


const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

//test for graphql
const { ApolloServer, gql } = require("apollo-server");
const { createTestClient } = require("apollo-server-testing");
const { user, userResolvers } = require('../schema/user/user.schema');
const { product, productResolvers } = require('../schema/product/product.schema');
const { merge } = require('lodash');

const serverT = new ApolloServer({
  typeDefs: [user, product],
  resolvers: merge(userResolvers, productResolvers),
});

const { query, mutate } = createTestClient(serverT);

//get all product
test("get all product", async () => {
  const QUERY_PRODUCT = gql`
  query {
    products{
      productName
      productDetail
      deliveryFee
      totalNumber
    }
  }
  `;

  const
    data
      = await query({ query: QUERY_PRODUCT });
  console.log(data)
  expect(data.data).toBeTruthy();
});

//insert a new product
test("insert product", async () => {
  const INSERT_PRODUCT = gql`
  mutation {
    insert(
      productName: "BMW"
      productDetail: "BMW i10"
      deliveryFee: "50"
      totalNumber: 5
    )
  }
  `;

  const
    data
      = await query({ query: INSERT_PRODUCT });
  console.log(data)
  expect(data.data.insert).toBeTruthy();
});

//get all user
test("get all user", async () => {
  const QUERY_USER = gql`
  query {
    users{
      userName
      userEnableNotification
      productName
      firebaseToken
    }
  }
  `;

  const
    data
      = await query({ query: QUERY_USER });
  console.log(data)
  expect(data.data).toBeTruthy();
});

//register user
test("register User", async () => {
  const REGISTER_USER = gql`
  mutation {
    registerUser(
      userName: "user three"
      userEnableNotification: false
      productName: [""]
      firebaseToken: "token 3 send by front end"
    )
  }
  `;

  const
    data
      = await query({ query: REGISTER_USER });
  console.log(data)
  expect(data).toBeTruthy();
});

//user enable notification
test("User Enable Notification", async () => {
  const USER_ENABLE = gql`
  mutation {
    enable(
      fToken: "token 3 send by front end"
    )
  }
  `;

  const
    data
      = await query({ query: USER_ENABLE });
  console.log(data)
  expect(data.data.enable).toBeTruthy();
});

//register product to user
test("Register product to user", async () => {
  const USER_REGISTER_PRODUCT = gql`
  mutation {
    registerProduct(
      fToken: "token 2 send by front end"
      productName: "Toyota"
    )
  }
  `;

  const
    data
      = await query({ query: USER_REGISTER_PRODUCT });
  console.log(data)
  expect(data.data.registerProduct).toBeTruthy();
});