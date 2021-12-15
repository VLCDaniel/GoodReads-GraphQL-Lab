const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString,GraphQLID } = require("graphql");


const createBookType = new GraphQLInputObjectType({
    name: "createBook",
    fields: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description : { type: new GraphQLNonNull(GraphQLString) },
        releaseDate : { type: new GraphQLNonNull(GraphQLString) },
        categoryId : { type: new GraphQLNonNull(GraphQLID) },

    }
});

module.exports = createBookType;