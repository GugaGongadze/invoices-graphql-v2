const graphql = require('graphql');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLFloat,
	GraphQLInt
} = graphql;

const InvoiceDetailType = new GraphQLObjectType({
	name: 'InvoiceDetailType',
	fields: {
		id: { type: GraphQLID },
		userId: { type: GraphQLID },
		invoiceId: { type: GraphQLID },
		name: { type: GraphQLString },
		description: { type: GraphQLString },
		quantity: { type: GraphQLInt },
		price: { type: GraphQLFloat },
		total: { type: GraphQLFloat }
	}
});

module.exports = InvoiceDetailType;
