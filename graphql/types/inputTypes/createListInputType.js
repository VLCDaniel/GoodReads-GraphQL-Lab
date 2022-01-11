const {
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID,
} = require('graphql')

const createListInputType = new GraphQLInputObjectType({
    name: "createList",
    fields: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
    }
})

module.exports = createListInputType;