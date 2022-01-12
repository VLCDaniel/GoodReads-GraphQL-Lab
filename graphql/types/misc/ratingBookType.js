const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLFloat,
} = require('graphql')

const BookType = require('../bookType');

const ratingBookType = new GraphQLObjectType({
    name: 'RatingBook',
    fields: {
        id:{
            type: GraphQLID,
        },
        title:{
            type: GraphQLString,
        },
        description:{
            type: GraphQLString,
        },
        averageRating: {
            type: GraphQLFloat,
        }
    }
        
})

module.exports = ratingBookType;