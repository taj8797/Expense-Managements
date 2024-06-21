


const mongoose =require('mongoose')

const targetSchema = new mongoose.Schema({
  total: {
    type: Number,
    required: true,
    default: 3000,
  },
},{timestamps : true, versionKey : false});

const Target = mongoose.model("Target", targetSchema);

module.exports = Target;
