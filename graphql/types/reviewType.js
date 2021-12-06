const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
} = require('graphql');

// const BookType = require('./bookType');
const UserType = require('./userType');

const ReviewType = new GraphQLObjectType({
	name: 'Review',
	fields: {
		id: { type: GraphQLID },
		status: { type: GraphQLString },
		rating: { type: GraphQLInt },
		comment: { type: GraphQLString },
		// book: {
		// 	type: BookType,
		// 	resolve: async (source) => {
		// 		return await source.getBook();
		// 	}
		// },
		user: {
			type: UserType,
			resolve: async (source) => {
				return await source.getUser();
			}
		}


	}
});

module.exports = ReviewType;