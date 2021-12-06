const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull,
} = require('graphql');

const bookType = require('./types/bookType');
const userType = require('./types/userType');
const authorType = require('./types/authorType');
const reviewType = require('./types/reviewType');

const { getAllBooks, getBookById } = require('../controllers/books');
const { getAllUsers } = require('../controllers/users');
const { getAllAuthors } = require('../controllers/authors');
const { getAllReviews } = require('../controllers/reviews');

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        books: {
            type: new GraphQLList(bookType),
            resolve: async () => {
                return await getAllBooks();
            }
        },
        book: {
            type: bookType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: async (source, { id }, context) => {
                console.info("book id: " + id);
                return await getBookById(id);
            }
        },
        users: {
            type: new GraphQLList(userType),
            resolve: async () => {
                return await getAllUsers();
            }
        },
        authors: {
            type: new GraphQLList(authorType),
            resolve: async () => {
                return await getAllAuthors();
            }
        },
        reviews: {
            type: new GraphQLList(reviewType),
            resolve: async () => {
                return await getAllReviews();
            }
        }
    },
})

module.exports = queryType;