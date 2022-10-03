require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/user.route");
const bookRouter = require("./routes/book.router");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json());
app.use("/user", userRoutes);
app.use("/book", bookRouter);

app.listen(3000, () => {
  console.log("server is running at port 3000");
});
