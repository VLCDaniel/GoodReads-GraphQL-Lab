const {
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID,
  } = require("graphql");
  
  const updateAuthorInputType = new GraphQLInputObjectType({
    name: "UpdateAuthorInput",
    fields: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      firstName: {
        type: GraphQLString,
      },
      lastName: {
        type: GraphQLString,
      },
      description: {
        type: GraphQLString,
      }
    },
  });
  
  module.exports = updateAuthorInputType;