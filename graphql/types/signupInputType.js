const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} = require("graphql");

const signupInputType = new GraphQLInputObjectType({
  name: "SignupInput",
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});

module.exports = signupInputType;
