const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
} = require('graphql')

const UserType = require('./userType')
const BookType = require('./bookType')

const ListType = new GraphQLObjectType({
    name: 'List',
    fields: {
        id: {
            type: GraphQLID,
        },
        title: {
            type: GraphQLString,
        },
        description: {
            type: GraphQLString,
        },
        owner: {
            type: UserType,
            resolve: async (source) => {
                return await source.getUser();
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve: async (source) => {
                return await source.getBooks();
            }

        }
    }
});

module.exports = ListType;