const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvoiceDetailSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: 'user' },
	invoiceId: { type: Schema.Types.ObjectId, ref: 'invoice' },
	name: { type: String },
	description: { type: String },
	quantity: { type: Number },
	price: { type: Number },
	total: { type: Number }
});

InvoiceDetailSchema.statics.editInvoiceDetail = function({
	id,
	name,
	description,
	quantity,
	price
}) {
	const total = quantity * price;

	return this.findById(id).then(invoiceDetail => {
		invoiceDetail.name = name;
		invoiceDetail.description = description;
		invoiceDetail.quantity = quantity;
		invoiceDetail.price = price;
		invoiceDetail.total = total;

		return invoiceDetail.save();
	})
}

mongoose.model('invoiceDetail', InvoiceDetailSchema);
