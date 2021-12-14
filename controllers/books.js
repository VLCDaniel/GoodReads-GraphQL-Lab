const db = require("../models");

module.exports.getAllBooks = async () => {
  try {
    const allBooks = await db.Book.findAll();
    return allBooks;
  } catch (error) {
    console.error("Something went wrong");
    return null;
  }
};

module.exports.getBookById = async (id) => {
  try {
    const book = await db.Book.findByPk(id);
    return book;
  } catch (error) {
    console.error("Something went wrong");
    return null;
  }
};

module.exports.createBook = async (args, context) => {
  try {
    const { title, authorId, description, releaseDate, categoryId } = args;
    const book = await db.Book.create({
      title,
      authorId,
      description,
      releaseDate,
      categoryId,
    });
    return book;
  } catch (error) {
    console.error("Something went wrong");
    return null;
  }
};

module.exports.updateBook = async (req, res) => {
  try {
    const book = await db.Book.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    return book;
  } catch (error) {
    console.error("Something went wrong");
    return null;
  }
};

module.exports.deleteBook = async (req, res) => {
  try {
    const book = await db.Book.destroy({
      where: {
        id: req.params.id,
      },
    });
    return book;
  } catch (error) {
    console.error("Something went wrong");
    return null;
  }
};
