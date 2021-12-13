const { user, rootUser }  = require('./user/user.schema');
const { product, rootProduct }  = require('./product/product.schema');

const {makeExecutableSchema} = require('@graphql-tools/schema');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');

const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs([user,product]),//merge array types
  resolvers: mergeResolvers([rootUser,rootProduct])//merge resolver type
})

const dataSchema = {
  schema: schema,
  graphiql: true,
}

module.exports = {
  dataSchema
}