const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_LINK);
    console.log("DB connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
