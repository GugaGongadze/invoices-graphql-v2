const graphql = require('graphql');
const mongoose = require('mongoose');
const { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLInt } = graphql;

const UserType = require('./user_type');

const InvoiceType = require('./invoice_type');
const Invoice = mongoose.model('invoice');

const InvoiceDetail = mongoose.model('invoiceDetail');
const InvoiceDetailType = require('./invoice_detail_type');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    currentUser: {
      type: UserType,
      resolve(parent, args, req) {
        console.log(req.user);
        return req.user;
      }
    },
    getInvoices: {
      type: new GraphQLList(InvoiceType),
      args: {
        skip: { type: GraphQLInt },
        limit: { type: GraphQLInt }
      },
      resolve(parent, { skip, limit }) {
        return Invoice.find({})
          .skip(skip)
          .limit(limit)
          .sort({created : -1});
      }
    },
    getInvoiceById: {
      type: InvoiceType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, { id }, req) {
        return Invoice.findById(id);
      }
    },
    getInvoicesByUserId: {
      type: new GraphQLList(InvoiceType),
      args: {
        userId: { type: GraphQLID }
      },
      resolve(parent, { userId }, req) {
        return Invoice.find({ userId });
      }
    },
    getInvoiceDetailsByInvoiceId: {
      type: InvoiceDetailType,
      args: {
        invoiceId: { type: GraphQLID }
      },
      resolve(parent, { invoiceId }, req) {
        return InvoiceDetail.findOne({ invoiceId });
      }
    }
  }
});

module.exports = RootQueryType;