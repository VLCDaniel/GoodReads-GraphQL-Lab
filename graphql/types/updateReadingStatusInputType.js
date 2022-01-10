const {
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID
} = require('graphql')


const updateReadingStatusInputType = new GraphQLInputObjectType({
    name: 'UpdateReadingStatusInput',
    fields: {
        book_id: { type: new GraphQLNonNull(GraphQLID)},
        readingStatus: {
            type: GraphQLString,
        },
    },
})

module.exports = updateReadingStatusInputType