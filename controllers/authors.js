const db = require('../models');

//TODO redo the req,res part, !fucking copilot 
module.exports.getAuthorById = async (id) => {
    try {
        const author = await db.Author.findById(id);
        return author;
    } catch (err) {
        return err;
    }
}

module.exports.getAllAuthors = async () => {
    try {
        const authors = await db.Author.findAll();
        return authors
    } catch (err) {
        return err;
    }
}

module.exports.createAuthor = async (args,context) => {
    try {
        const {firstName, lastName, description, birthday} = args;
        const author = await db.Author.create({
            firstName,
            lastName,
            description,
            birthday
        });
        return author;
    } catch (err) {
        return err;
    }
}

module.exports.updateAuthor = async (req, res) => {
    try {
        const author = await db.Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return author;
    } catch (err) {
        return err;
    }
}

module.exports.deleteAuthor = async (req, res) => {
    try {
        const author = await db.Author.findByIdAndDelete(req.params.id);
        return author;
    } catch (err) {
        return err;
    }
}