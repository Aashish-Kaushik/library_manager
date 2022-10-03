const mongoose = require("mongoose");
const userModel = require("./user.model");

const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  page: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

module.exports = mongoose.model("book", BookSchema);
