const {
    GraphQLSchema,
} = require('graphql');

const queryType = require('./queryType');
const mutationType = require('./mutationType');

const schema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType,
});

module.exports = schema;