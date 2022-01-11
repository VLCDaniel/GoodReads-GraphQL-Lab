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

module.exports.getListById = async (source,args,context) => {
    try {
        const { listId } = args;
        const list = await db.List.findByPk(listId);
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

module.exports.removeBookFromList = async (source,args,context) => {
    try{
        const { userId } = context;
        const { bookId, listId } = args;

        const list = await db.List.findByPk(listId);
        const book = await db.Book.findByPk(bookId);

        if(list.userId !== userId){
            throw new Error("You can't remove a book from a list that doesn't belong to you");
        }

        await list.removeBook(book);

        return list;
    }catch(error){
        console.error("Something went wrong");
        console.error(error);
        return null;
    }
}
/**
 * One user might want to add all of the books of another list to it's list
 * This function will add all the books of an arbitrary list to the specified user's list
 * 
 * @param {*} args should have the id-s of the two lists
 * @returns 
 */
module.exports.mergeLists = async (source,args,context) => {
    try{
        const { userId } = context;
        const { listId, mergeListId } = args;

        const list1 = await db.List.findByPk(listId);
        const list2 = await db.List.findByPk(mergeListId);

        if(list1.userId !== userId){
            throw new Error("You can't modify a list that doesn't belong to you");
        }

        const booksInList2 = await list2.getBooks();

        const list1Books = await list1.getBooks();
        booksInList2.forEach(async book => {
            if(!list1Books.find(aux => aux.id == book.id)){
                await list1.addBook(book);
            }
        });

        return list1;
    }catch(error){
        console.error("Something went wrong");
        console.error(error);
        return null;
    }
}