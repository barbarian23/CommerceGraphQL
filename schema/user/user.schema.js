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
        registerUser(userName: String, userEnableNotification: Boolean, productName: [String], firebaseToken: String): Boolean
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
    let db = await connect(MONGO_CONNECTION_STRING, MONGO_DB);
    let result =await insert(db, TABLE_USER, {
      registerUser: registerUser,
      userEnableNotification: userEnableNotification,
      productName: productName,
      firebaseToken: firebaseToken
    });
    console.log("res",result);
    return true;
  } catch (e) {
    console.log("e",e);
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
    console.log(tUser);
    if(tUser.productName[0] == ""){
      tUser.productName[0] = productName;
    } else {
    await tUser.productName.push(productName);
    }
    console.log(tUser);
    await update(db, TABLE_USER, {firebaseToken: fToken }, {$set: { productName : tUser.productName }});
    return true;
  } catch (e) {
    console.log(e);
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