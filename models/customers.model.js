const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true },
    amount: { type: String, required: true },
    accountType: { type: String, required: true },
    accountNumber: {
      type: String,
      required: true,
      // unique: true,
      // dropDups: true,
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
