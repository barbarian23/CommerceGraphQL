require("dotenv").config();
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
const MONGO_DB = process.env.MONGO_DB;
const TABLE_USER = process.env.TABLE_USER;
const TABLE_PRODUCT = process.env.TABLE_PRODUCT;
module.exports = {
  MONGO_CONNECTION_STRING,
  MONGO_DB,
  TABLE_USER,
  TABLE_PRODUCT
}