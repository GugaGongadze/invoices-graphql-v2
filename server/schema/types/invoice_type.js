const graphql = require('graphql');
const InvoiceDetailType = require('./invoice_detail_type');
const mongoose = require('mongoose');
const InvoiceDetail = mongoose.model('invoiceDetail');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const InvoiceType = new GraphQLObjectType({
  name: 'InvoiceType',
  fields: {
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    name: { type: GraphQLString },
    date: { type: GraphQLString },
    created: { type: GraphQLString },
    modified: { type: GraphQLString },
    description: { type: GraphQLString },
    contactName: { type: GraphQLString },
    address: { type: GraphQLString },
    invoiceDetails: {
      type: new GraphQLList(InvoiceDetailType),
      resolve(parent) {
        return InvoiceDetail.find({ invoiceId: parent.id });
      }
    }
  }
});

module.exports = InvoiceType;
