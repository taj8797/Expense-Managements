const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },

},{timestamps: true , versionKey : false});

const cashTransaction = mongoose.model("cashTransaction", transactionSchema);

module.exports = cashTransaction;
