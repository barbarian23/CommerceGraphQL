const { user, userResolvers }  = require('./user/user.schema');
const { product, productResolvers }  = require('./product/product.schema');
const { merge } = require('lodash');

const {makeExecutableSchema} = require('@graphql-tools/schema');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');

// const schema = makeExecutableSchema({
//   typeDefs: mergeTypeDefs([user,product]),//merge array types
//   resolvers: mergeResolvers([userResolvers,productResolvers])//merge resolver type
// })

const dataSchema = makeExecutableSchema({
  typeDefs: [ user,product ],
  resolvers: merge(userResolvers, productResolvers)
});

// const dataSchema = {
//   schema: schema,
//   graphiql: true,
// }

module.exports = {
  dataSchema
}