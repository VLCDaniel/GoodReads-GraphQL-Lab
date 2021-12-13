const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList
} = require('graphql');

const AuthorType = require('./authorType');
const ReviewType = require('./reviewType');

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
        author: {
            type: require('./authorType'),
            resolve: async (source) => {
                return await source.getAuthor();
            }
        },
        reviews: {
            type: new GraphQLList(ReviewType),
            resolve: async (source) => {
                return await source.getReviews();
            }
        }

    }
});

module.exports = BookType;