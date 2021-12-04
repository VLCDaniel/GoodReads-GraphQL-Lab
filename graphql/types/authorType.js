const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
} = require('graphql');

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: {
        id: {
            type: GraphQLID
        },
        firstName: {
            type: GraphQLString
        },
        lastName: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        birthday: {
            type: GraphQLString
        }

    }
})

module.exports = AuthorType;