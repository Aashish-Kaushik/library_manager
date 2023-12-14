const express = require("express");
const bookController = require("../controllers/book.controller");
const auth = require("../middlewares/auth");
const role = require("../models/role.js")

const router = express.Router();

router.post("/create", bookController.create);

router.put("/update/:id", bookController.update);

router.get("/getall", bookController.findall);

router.get("/get/:id", bookController.findone);

router.delete("/delete", auth, bookController.deleteAll);

router.delete("/delete/:id", auth, bookController.delete);

module.exports = router;
