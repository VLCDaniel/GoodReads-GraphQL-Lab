const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLList,
} = require("graphql");

const reviewType = require("./reviewType");

const userType = new GraphQLObjectType({
	name: "User",
	fields: {
		id: {
			type: GraphQLID,
		},
		email: {
			type: GraphQLString,
		},
		firstName: {
			type: GraphQLString,
		},
		lastName: {
			type: GraphQLString,
		},
		userName: {
			type: GraphQLString,
		},
		reviews: {
			type: new GraphQLList(reviewType),
			resolve: async (source) => {
				return await source.getReviews();
			},
		},
	},
});

module.exports = userType;
