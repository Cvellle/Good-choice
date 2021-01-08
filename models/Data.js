const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
  {
    id: Number,
    firstName: String,
    lastName: String,
    mail: String,
    password: String,
    registrationKey: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Data", DataSchema);
