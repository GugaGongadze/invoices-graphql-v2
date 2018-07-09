const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLFloat,
  GraphQLInt
} = graphql;

const UserType = require('./types/user_type');
const AuthService = require('../services/auth');

const Invoice = mongoose.model('invoice');
const InvoiceType = require('./types/invoice_type');

const InvoiceDetail = mongoose.model('invoiceDetail');
const InvoiceDetailType = require('./types/invoice_detail_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parent, { username, email, password }, req) {
        return AuthService.signup({ username, email, password, req });
      }
    },
    login: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parent, { username, password }, req) {
        return AuthService.login({ username, password, req });
      }
    },
    logout: {
      type: UserType,
      resolve(parent, args, req) {
        const { user } = req;
        req.logout();
        return user;
      }
    },
    createInvoice: {
      type: InvoiceType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        contactName: { type: GraphQLString },
        address: { type: GraphQLString },
        userId: { type: GraphQLID },
        date: { type: GraphQLString }
      },
      resolve(
        parent,
        { name, description, contactName, address, userId, date },
        req
      ) {
        return new Invoice({
          name,
          description,
          contactName,
          address,
          userId,
          created: Date.now(),
          modified: Date.now(),
          date
        }).save();
      }
    },
    deleteInvoice: {
      type: InvoiceType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, { id }, req) {
        return Invoice.remove({ _id: id });
      }
    },
    editInvoice: {
      type: InvoiceType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        contactName: { type: GraphQLString },
        address: { type: GraphQLString },
        date: { type: GraphQLString }
      },
      resolve(parent, args, req) {
        return Invoice.editInvoice(args);
      }
    },
    createInvoiceDetails: {
      type: InvoiceDetailType,
      args: {
        userId: { type: GraphQLID },
        invoiceId: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        quantity: { type: GraphQLInt },
        price: { type: GraphQLFloat },
        total: { type: GraphQLFloat }
      },
      resolve(
        parent,
        { userId, invoiceId, name, description, quantity, price, total },
        req
      ) {
        return new InvoiceDetail({
          userId,
          invoiceId,
          name,
          description,
          quantity,
          price,
          total
        }).save();
      }
    },
    deleteInvoiceDetails: {
      type: InvoiceDetailType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, { id }, req) {
        console.log(id);
        return InvoiceDetail.remove({ _id: id });
      }
    },
    editInvoiceDetails: {
      type: InvoiceDetailType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        quantity: { type: GraphQLInt },
        price: { type: GraphQLFloat },
        total: { type: GraphQLFloat }
      },
      resolve(parent, args, req) {
        return InvoiceDetail.editInvoiceDetail(args);
      }
    }
  }
});

module.exports = mutation;
