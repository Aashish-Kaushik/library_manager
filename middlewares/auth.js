const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const config = process.env;

const verifyToken = (role) => async (req, res, next) => {
  const token = req.body.token;
  if (!token) {
    res.json({ message: "A token is required for authentiction" });
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = await UserModel.findById(decoded.user_id);
    if (role) {

      if (req.user.role !== role) {
        return res.status(401).send("not Allowed")
      }
    }
    return next();
  } catch (err) {
    res.json({ message: "Invalid Token" });
  }
};


const checkRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(401).send("not Allowed")
    }
    next()
  }
}
module.exports = { checkRole, verifyToken } 