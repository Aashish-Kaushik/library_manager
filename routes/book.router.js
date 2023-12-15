const express = require("express");
const bookController = require("../controllers/book.controller");
const { verifyToken } = require("../middlewares/auth.js");
const role = require("../models/role.js")

const router = express.Router();

router.post("/create", verifyToken("admin"), bookController.create);

router.put("/update/:id", verifyToken("admin"), bookController.update);

router.get("/getall", bookController.findall);

router.get("/get/:id", bookController.findone);

router.delete("/delete", verifyToken("admin"), bookController.deleteAll);

router.delete("/delete/:id", verifyToken("admin"), bookController.delete);

module.exports = router;
