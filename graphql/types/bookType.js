const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLFloat,
  GraphQLInt,
} = require("graphql");

const AuthorType = require("./authorType");
const ReviewType = require("./reviewType");

const BookType = new GraphQLObjectType({
  name: "Book",
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
    releaseDate: {
      type: GraphQLString,
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: async (source) => {
        return await source.getAuthors();
      },
    },
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve: async (source) => {
        return await source.getReviews();
      },
    },
  },
});

module.exports = BookType;
