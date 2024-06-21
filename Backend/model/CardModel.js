const mongoose = require("mongoose");

const creditCardSchema = new mongoose.Schema({
  cardName: { type: String, required: true },
  cardNumber: { type: Number, required: true, unique: true },
  issueddate: { type:  Date,required: true },
  expirydate: { type: Date,required: true },
  accountHolderName: { type: String, required: true },

},{timestamps : true , versionKey : false});

const Card = mongoose.model("Card", creditCardSchema);

module.exports = Card;
