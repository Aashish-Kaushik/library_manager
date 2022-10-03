const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const config = process.env;

const verifyToken = async (req, res, next) => {
  const token = req.body.token;
  if (!token) {
    res.json({ message: "A token is required for authentiction" });
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = await UserModel.findById(decoded.user_id);
    return next();
  } catch (err) {
    res.json({ message: "Invalid Token" });
  }
};

module.exports = verifyToken;
