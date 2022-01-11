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
    const { title, description, releaseDate, categoryId } = args;
    const book = await db.Book.create({
      title,
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

module.exports.getReadingList = async (context) =>{
  const userId  = context.user.id;

  try{
    const readingList = await db.Review.findAll({
      where: {
        userId: userId,
      },
      include:{
        model: db.Book,
      }
    });
    const books = readingList.map(review => review.Book);
    console.log(books);
    return books;
  }catch(e){
    console.log(e);
  }
};

module.exports.getUserReadingList = async (id) => {
  try {
    const readingList = await db.Review.findAll({
      where: {
        userId: id,
      },
      include:{
        model: db.Book,
      }
    });
    const books = readingList.map(review => review.Book);
    console.log(books);
    return books;
  } catch (error) {
    console.error("Something went wrong");
    return null;
  }
}
