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

const { getAllBooks, getBookById, getReadingList,getUserReadingList,getBooksInCategory,getHighestRatedBooks } = require('../controllers/books');
const { getAllUsers, getSimilarityProfile} = require('../controllers/users');
const { getAllAuthors, getAuthorById } = require('../controllers/authors');
const { getAllReviews } = require('../controllers/reviews');

const searchResultType = require('./types/searchResultType');
const { search } = require('../controllers/search');

const ratingBookType = require('./types/misc/ratingBookType');


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
        author: {
            type: authorType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: async (source, { id }, context) => {
                return await getAuthorById(id);
            }
        },
        reviews: {
            type: new GraphQLList(reviewType),
            resolve: async () => {
                return await getAllReviews();
            }
        },
        search: {
            type: new GraphQLList(searchResultType),
            args: {
                query: {
                    type: GraphQLString
                }
            },
            resolve: async (source, { query }) => {
                return search(query);
            }
        },
        getCurrentUserReadingList:{
            type: new GraphQLList(bookType),
            resolve: async (source, args, context) => {
                return await getReadingList(context);  
            }
        },
        getUserReadingList:{
            type: new GraphQLList(bookType),
            args: {
                userId: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: async (source, { userId }, context) => {
                return await getUserReadingList(userId);
            }
        },
        getBooksInCategory:{
            type: new GraphQLList(bookType),
            args: {
                category: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: async (source, args, context) => {
                return await getBooksInCategory(args.category);
            }
        },
        getHighestRatedBooks:{
            type: new GraphQLList(ratingBookType),
            resolve: async (source, args, context) => {
                return await getHighestRatedBooks();
            }
        },
        getSimilarityProfile:{
            type: new GraphQLList(bookType),
            args: {
                otherUserId: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: async (source, { otherUserId }, context) => {
                return await getSimilarityProfile(otherUserId, context);
            }
        }
    },

})

module.exports = queryType;