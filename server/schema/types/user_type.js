const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID
} = graphql;

const UserType = new GraphQLObjectType({
	name: 'UserType',
	fields: {
		id: { type: GraphQLID },
		username: { type: GraphQLString },
		email: { type: GraphQLString },
		created: { type: GraphQLString },
		activated: { type: GraphQLString }
	}
});

module.exports = UserType;
