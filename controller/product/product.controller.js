const { graphqlHTTP }  = require('express-graphql');
const { dataSchema } = require('../../schema/rootSchema');
const { graphql } = require('graphql');

const getAllProducts = function (req, res) {
  graphql(dataSchema, `{products}`).then((response) => {
    if (response.data) {
      res.send("success");
    } else {
      res.send("failed");
    }
  });
}

module.exports = {
  getAllProducts
}