


const mongoose = require("mongoose")

const accountSchema = new mongoose.Schema({
   bankName: { type: String, required: true },

  accountHolderName: { type: String, required: true },
  accountNumber: { type: String, required: true, unique: true },
  availableBalance: { type: Number, required: true }
},{timestamps : true, versionKey : false});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;