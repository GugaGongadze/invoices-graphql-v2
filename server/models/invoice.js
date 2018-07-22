const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
  name: { type: String },
  date: { type: String },
  created: { type: Date },
  modified: { type: Date },
  description: { type: String },
  contactName: { type: String },
  address: { type: String }
});

InvoiceSchema.index({
  name: 'text'
});

InvoiceSchema.statics.editInvoice = function({
  id,
  name,
  description,
  contactName,
  address,
  date
}) {
  return this.findById(id).then(invoice => {
    invoice.name = name;
    invoice.description = description;
    invoice.contactName = contactName;
    invoice.address = address;
    invoice.modified = Date.now();
    invoice.date = date;

    return invoice.save();
  });
};

mongoose.model('invoice', InvoiceSchema);
