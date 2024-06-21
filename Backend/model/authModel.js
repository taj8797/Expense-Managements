const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: { 
      type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: String },
    otpExpires: { type: Date },
    isVerified: { type: Boolean, default: false },
  },

  { timestamps: true, versionKey: false }
);

const users = mongoose.model("users", userSchema);

module.exports = users;
