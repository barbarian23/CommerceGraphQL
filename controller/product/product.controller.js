const { createApolloFetch } = require('apollo-fetch');

const getAllProducts = function (req, res) {

  const fetch = createApolloFetch({
    uri: 'http://localhost:4000/graphql',
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
      `,
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