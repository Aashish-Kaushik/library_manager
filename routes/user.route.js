const express = require("express");
const userController = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/auth.js");

const router = express.Router();

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/profile/:id", userController.findone);

router.delete("/delete/:id", verifyToken(), userController.delete);

router.delete("/delete", verifyToken(), userController.deleteAll);

router.put("/forgot", userController.forgot);

router.put("/reset/:token", userController.reset);

module.exports = router;
