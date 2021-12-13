const  {
  connect,
  findAll,
  findOne,
  update
} = require ('../../service/mongo.service');

const { MONGO_CONNECTION_STRING, MONGO_DB, TABLE_USER} = require("../../config/mongo.config");

const user = `
    type User {
        userName: String
        userEnableNotification: Boolean
        productName: String
        firebaseToken: String
    }
    type Query {
        users: [User]
    }
    type Mutation {
        enable(fToken: String!): Boolean
        registerProduct(fToken: String!, productName: String!): Boolean
    }
`;

const fakeList = [
  {
    userName: 'user one',
    productRegister: true,
    productName: '[]',
    firebaseToken: 'token 1 send by front end',
  },
  {
    userName: 'user two',
    productRegister: false,
    productName: '[]',
    firebaseToken: 'token 2 send by front end',
  },
];

//resolvers
const getUser = async function () {
 // return fakeList;
  try {
    let db = await connect(MONGO_CONNECTION_STRING, MONGO_DB);
    let tList = await findAll(db, TABLE_USER);
    return tList;
  } catch (e) {
    return [];
  }
}

const setEnable = async function (fToken) {
  // let result = {};
  // fakeList.some(item => {
  //   if (item.firebaseToken === fToken) {
  //     item.productRegister = true;
  //     result = item;
  //     return true;
  //   }
  // });
  // return result;
  try {
    let db = await connect(MONGO_CONNECTION_STRING, MONGO_DB);
     await update(db, TABLE_USER, {firebaseToken: fToken}, {$set: { productRegister: true }});
    return true;
  } catch (e) {
    return false;
  }

}

const registerProduct = async function (fToken, productName) {
  // let result = fakeList.some(item => {
  //   if (item.firebaseToken  === fToken) {
  //     item.productName.push(productName);
  //     return true;
  //   }
  // });
  // return result;

  try {
    let db = await connect(MONGO_CONNECTION_STRING, MONGO_DB);
    let tUser = await findOne(db, TABLE_USER, {firebaseToken: fToken });
    await update(db, TABLE_USER, {firebaseToken: fToken }, {$set: { productName : tUser.productName.push(productName) }});
    return true;
  } catch (e) {
    return false;
  }
}

var userResolvers = {
  Query: {
    users: getUser,
  },
  Mutation: {
    enable: setEnable,
    registerProduct: registerProduct
  }
};

module.exports = {
  user,
  userResolvers
}