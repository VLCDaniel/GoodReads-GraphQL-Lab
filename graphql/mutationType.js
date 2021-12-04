const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
} = require('graphql');

const bookType = require('./types/bookType');
//TODO cahnge this to eng with "-input"
const createBookType = require('./types/createBookType');
const db = require('../models');

const {updateBook,createBook} = require('../controllers/books');

const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createBook: {
            type: bookType,
            args: {
                createBook:{
                    type: createBookType
                }
            },
            resolve: async(source,args) => {
                return await createBook(args.createBook);   
            }
        }
    }
});
module.exports = mutationType;