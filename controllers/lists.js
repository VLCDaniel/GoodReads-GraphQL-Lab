const db = require("../models");

module.exports.createList = async (source,args,context) => {
    try {
        const { userId } = context;
        const { title, description} = args;
        const list = await db.List.create({
        title,
        description,
        userId,
        });
        return list;
    } catch (error) {
        console.error("Something went wrong");
        return null;
    }
}


module.exports.addBookToList = async (source,args,context) => {
    try {
        const { userId } = context;
        const { bookId, listId } = args;

        const list = await db.List.findByPk(listId);
        const book = await db.Book.findByPk(bookId);
        if(list.userId !== userId){
            throw new Error("You can't add a book to a list that doesn't belong to you");
        }

        //check if book already in list
        const booksInList = await list.getBooks();
        console.log(`We have ${booksInList.length} books in this list`);
        const bookInList = booksInList.find(aux => aux.id == bookId);
        console.log
        if(bookInList){
            throw new Error("Book already in list");
        }

        await list.addBook(book);
    
        return list;
    } catch (error) {
        console.error("Something went wrong");
        console.error(error);
        return null;
    }
}