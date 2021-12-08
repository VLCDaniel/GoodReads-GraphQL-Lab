const { GraphQLUnionType } = require("graphql");
const userType = require('./userType');
const bookType = require('./bookType');
const db = require('../../models');

const searchResultType = new GraphQLUnionType({
	name: 'SearchResult',
	types: [userType, bookType],
	resolveType(value) {
		if (value instanceof db.User) {
			return userType.name;
		}

		if (value instanceof db.Book) {
			return bookType.name;
		}
		return null;
	}
});

module.exports = searchResultType;