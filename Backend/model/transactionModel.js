
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['UPI', 'DebitCard', 'CreditCard'],
    required: true
  },

  bankId: { type: mongoose.Schema.Types.ObjectId, 
    ref: 'accounts', required: true },


  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
   
  },
  description: {
    type: String,
    required: true
  },
  merchant: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  
},{timestamps : true, versionKey : false});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
