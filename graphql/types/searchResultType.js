const { GraphQLUnionType } = require("graphql");
const authorType = require('./authorType');
const bookType = require('./bookType');
const db = require('../../models');

const searchResultType = new GraphQLUnionType({
	name: 'SearchResult',
	types: [authorType, bookType],
	resolveType(value) {
		if (value instanceof db.Author) {
			return authorType.name;
		}

		if (value instanceof db.Book) {
			return bookType.name;
		}
		return null;
	}
});

module.exports = searchResultType;