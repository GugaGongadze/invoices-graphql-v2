const graphql = require('graphql');
const mongoose = require('mongoose');
const Invoice = mongoose.model('invoice');

const {
	GraphQLObjectType,
    GraphQLString,
    GraphQLID
} = graphql;

const InvoiceType = new GraphQLObjectType({
	name: 'InvoiceType',
	fields: {
        id: {type: GraphQLID},
		userId: { type: GraphQLID },
		name: { type: GraphQLString },
		date: { type: GraphQLString },
		created: { type: GraphQLString },
		modified: { type: GraphQLString },
		description: { type: GraphQLString },
		contactName: { type: GraphQLString },
		address: { type: GraphQLString }
	}
});

module.exports = InvoiceType;
