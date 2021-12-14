const  {
  connect,
  findAll,
  findOne,
  update,
  insert
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
        registerUser(userName: String, userEnableNotification: String, productName: String, firebaseToken: String): Boolean
        enable(fToken: String): Boolean
        registerProduct(fToken: String, productName: String): Boolean
    }
`;

//resolvers
const getUser = async function () {
  try {
    let db = await connect(MONGO_CONNECTION_STRING, MONGO_DB);
    let tList = await findAll(db, TABLE_USER);
    return tList;
  } catch (e) {
    return [];
  }
}

const registerUser = async function (_, {registerUser, userEnableNotification, productName, firebaseToken}) {
  try {
    await insert(db, TABLE_USER, {
      registerUser: registerUser,
      userEnableNotification: userEnableNotification,
      productName: productName,
      firebaseToken: firebaseToken
    });
    return true;
  } catch (e) {
    return false;
  }
}

const setEnable = async function (_, {fToken}) {
  try {
    console.log("setEnable",fToken);
    let db = await connect(MONGO_CONNECTION_STRING, MONGO_DB);
     await update(db, TABLE_USER, {firebaseToken: fToken}, {$set: { productRegister: true }});
    return true;
  } catch (e) {
    return false;
  }

}

const registerProduct = async function (_, {fToken, productName}) {
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
    registerUser: registerUser,
    enable: setEnable,
    registerProduct: registerProduct
  }
};

module.exports = {
  user,
  userResolvers
}