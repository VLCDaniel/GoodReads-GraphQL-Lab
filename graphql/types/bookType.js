const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
} = require('graphql');

const AuthorType = require('./authorType');

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: {
        id: {
            type: GraphQLID
        },
        title: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        releaseDate: {
            type: GraphQLString
        },
        author:{
            type: AuthorType,
            resolve: async (source) => {
                return await source.getAuthor();
            }

        }

    }
});

module.exports = BookType;