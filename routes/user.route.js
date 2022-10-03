const express = require("express");
const userController = require("../controllers/user.controller");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/profile/:id", userController.findone);

router.delete("/delete/:id", auth, userController.delete);

router.delete("/delete", auth, userController.deleteAll);

router.put("/forgot", userController.forgot);

router.put("/reset/:token", userController.reset);

module.exports = router;
