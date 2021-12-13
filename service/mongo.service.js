const { MongoClient } = require('mongodb');

const connect = function (URL, dbName) {
  return new Promise(async function (res, rej) {

    try {
      //const url = 'mongodb://localhost:27017';
      const client = new MongoClient(URL);

      await client.connect();
      console.log('Connected successfully to server');
      const db = client.db(dbName);
      res(db);
    } catch (e) {
      console.log('Failed connected');
      rej(e);
    }
  });
}

const insert = async function (db, collection, object) {
  try {
    const res = await db.collection(collection).insertOne(object);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

const findAll = async function (db, collection) {
  try {
    return await db.collection(collection).find({}).toArray();
  } catch (error) {
    console.log(error);
    return [];
  }
}

const findOne = async function (db, collection, query) {
  try {
    return await db.collection(collection).findOne(query);
  } catch (error) {
    console.log(error);
    return null;
  }
}


const update = async function (db, collection, query, updateStatus) {
  try {
    await db.collection(collection).updateOne(query, updateStatus);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  connect,
  insert,
  findAll,
  update,
  findOne
}