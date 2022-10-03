const bookModel = require("../models/book.model");
const BookModel = require("../models/book.model");

exports.create = async (req, res) => {
  try {
    const book = await BookModel.create({
      name: req.body.name,
      page: req.body.page,
      price: req.body.price,
      authorId: req.body.authorId,
    });
    res.send(book);
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const book = await bookModel.findById(req.params.id);
  if (book) {
    if (req.user._id == book.authorId) {
      await bookModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.send(book);
    } else {
      res.json({ message: "Permision denied" });
    }
  } else {
    res.json({ message: "Book not Found" });
  }
};

exports.findall = async (req, res) => {
  const book = await bookModel.find();
  res.send(book);
};

exports.findone = async (req, res) => {
  const book = await bookModel.findById(req.params.id);
  res.send(book);
};

exports.deleteAll = async (req, res) => {
  if (req.user.role == "admin") {
    await bookModel.deleteMany();
    res.json({ message: "All Book deleted" });
  } else {
    res.json({ message: "permision denied" });
  }
};

exports.delete = async (req, res) => {
  const book = await bookModel.findById(req.params.id);

  if (book) {
    if (req.user._id == book.authorId) {
      await bookModel.findByIdAndDelete(req.params.id);
      res.json({ message: "Book deleted" });
    } else {
      res.json({ message: "permision denied" });
    }
  } else {
    res.json({ message: "No book Found" });
  }
};
