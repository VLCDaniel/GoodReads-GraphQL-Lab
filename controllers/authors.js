const db = require('../models');

module.exports.getAuthorById = async (id) => {
    try {
        const author = await db.Author.findByPk(id);
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

module.exports.updateAuthor = async (args) => {
    try {
        const {id, firstName, lastName, description} = args;
        const author = await db.Author.update({firstName,lastName,description}, {
            where: {
                id: id
            }
        });
        return this.getAuthorById(id);
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