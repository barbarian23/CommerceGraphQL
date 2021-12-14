const { createApolloFetch } = require('apollo-fetch');
const { QUERY_GRAPHQL_UR} = require("../../constant/common.constant");
const {MONGO_CONNECTION_STRING, MONGO_DB, TABLE_PRODUCT} = require("../../config/mongo.config");

const {connect,findAll} = require('../../service/mongo.service');

const getAllProducts = async function (req, res) {
  try{
    let db = await connect(MONGO_CONNECTION_STRING, MONGO_DB);
    let tList = await findAll(db, TABLE_PRODUCT);
    res.send({data:tList});
  }catch(err){
    console.log(err);
    res.send(err);
  }


  
}

module.exports = {
  getAllProducts
}