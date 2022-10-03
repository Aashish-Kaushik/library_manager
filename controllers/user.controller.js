const userModel = require("../models/user.model");
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bookModel = require("../models/book.model");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  try {
    const user = new UserModel({
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      password: hashPassword,
      role: req.body.role,
    });
    const token = await jwt.sign({ user_id: user._id }, process.env.TOKEN_KEY, {
      expiresIn: "30d",
    });
    user.token = token;
    await user.save();
    res.send({ user });
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      try {
        jwt.verify(token, config.TOKEN_KEY);
      } catch (err) {
        const token = await jwt.sign(
          { user_id: user._id },
          process.env.TOKEN_KEY,
          {
            expiresIn: "30d",
          }
        );
        user.token = token;
        user.save();
      }

      res.json({ message: "you are loged in", token: user.token });
    } else {
      res.json({ message: "incorrect password please try Again " });
    }
  } else {
    res.json({ message: "User not Found" });
  }
};

exports.findone = async (req, res) => {
  const user = await userModel.findById(req.params.id);
  res.send(user);
};

exports.delete = async (req, res) => {
  const user = await userModel.findById(req.params.id);
  if (user) {
    if (req.user.id == user.id) {
      await userModel.findByIdAndDelete(req.params.id);
      res.json({ message: "usere delete by user" });
    } else if (req.user.role == "admin") {
      await userModel.findByIdAndDelete(req.params.id);
      res.json({ message: "user is delete by admin" });
    } else {
      res.json({ message: "permision Denied" });
    }
  } else {
    res.json({ message: "user not find" });
  }
};

exports.deleteAll = async (req, res) => {
  if (req.user.role == "admin") {
    await userModel.deleteMany();
    res.json({ message: "all user deleted" });
  } else {
    res.json({ message: "permision denied" });
  }
};

exports.forgot = async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (user) {
    const token = await jwt.sign({ user_id: user._id }, process.env.TOKEN_KEY, {
      expiresIn: "600000",
    });
    user.restPasswordToken = token;
    await user.save();

    res.json({
      message: "your rest link: http://localhost:3000/user/reset/" + token,
    });
  } else {
    res.json({ message: "User not found" });
  }
};

exports.reset = async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.TOKEN_KEY);
    const user = await userModel.findOne({
      restPasswordToken: req.params.token,
    });
    if (user && decoded.user_id == user._id) {
      user.password = req.body.password;
      user.restPasswordToken = "";
      await user.save();

      res.json({ message: "your password changed succesfuly" });
    } else {
      res.json({ message: "token is invalid" });
    }
  } catch (err) {
    res.json({ message: "Invalid Token" });
  }
};
