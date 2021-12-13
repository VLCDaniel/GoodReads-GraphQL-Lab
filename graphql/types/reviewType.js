const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
} = require('graphql');

var ReviewType = new GraphQLObjectType({
	name: 'Review',
	fields: () =>  ({
		id: { type: GraphQLID },
		status: { type: GraphQLString },
		rating: { type: GraphQLInt },
		comment: { type: GraphQLString },
		book: {
			type: require('./bookType'),
			resolve: async (source) => {
				return await source.getBook();
			}
		},
		user: {
			type: require('./userType'),
			resolve: async (source) => {
				return await source.getUser();
			}
		}


	}),
});


module.exports = ReviewType;

