const { createApolloFetch } = require('apollo-fetch');
const { QUERY_GRAPHQL_URL } = require("../../constant/common.constant");

const getAllProducts = function (req, res) {

  const fetch = createApolloFetch({
    uri: QUERY_GRAPHQL_URL,
  });

  fetch({
    query: `query Product {
          products {
            productName
            productDetail
            deliveryFee
            totalNumber
          }
      }
      `
  }).then(function(result){
    console.log(result.data);
    res.send(JSON.stringify(result.data));
  }).catch(function(err){
    console.log(err);
    res.send(err);
  });
}

module.exports = {
  getAllProducts
}