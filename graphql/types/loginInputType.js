const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } = require("graphql");

const loginInputType = new GraphQLInputObjectType({
  name: 'LoginInput',
  fields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    }
  }
});

module.exports = loginInputType;