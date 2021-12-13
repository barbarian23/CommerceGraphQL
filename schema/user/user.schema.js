const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  buildSchema
} = require('graphql');

const user = buildSchema(`
    type User {
        userName: String
        userEnableNotification: Boolean
        firebaseToken: String
    }
    type Query {
        users: [User]
    }
    type Mutation {
        enable(fToken: String!): Boolean
    }
`);

const fakeList = [
  {
    userName: 'user one',
    productRegister: true,
    firebaseToken: 'token send by front end',
  },
  {
    userName: 'user two',
    productRegister: false,
    firebaseToken: 'token send by front end',
  },
];

const getUser = function () {
  return fakeList;
}

const setEnable = function (fToken) {
  let result = fakeList.some(item => {
    if (item.firebaseToken === fToken) {
      item.productRegister = true;
      return true;
    }
  });
  return result;
}

var rootUser = {
  Query: {
    users: getUser,
  },
  Mutation: {
    enable: setEnable
  }
};

module.exports = {
  user,
  rootUser
}