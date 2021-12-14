const { GraphQLObjectType, GraphQLString } = require("graphql");

const loginResultType = new GraphQLObjectType({
  name: 'LoginResult',
  fields: {
    token: {
      type: GraphQLString
    },
  },
});

module.exports = loginResultType;