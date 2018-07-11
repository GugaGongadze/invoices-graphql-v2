const graphql = require('graphql');
const InvoiceType = require('./invoice_type');
const mongoose = require('mongoose');
const Invoice = mongoose.model('invoice');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    created: { type: GraphQLString },
    activated: { type: GraphQLString },
    invoices: {
      type: new GraphQLList(InvoiceType),
      resolve(parent) {
        return Invoice.find({ userId: parent.id });
      }
    }
  }
});

module.exports = UserType;
