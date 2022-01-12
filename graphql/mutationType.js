const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt,
} = require("graphql");

const bookType = require("./types/bookType");
const createBookInputType = require("./types/createBookInputType");
const loginResultType = require("./types/loginResultType");
const loginInputType = require("./types/loginInputType");
const signupInputType = require("./types/signupInputType");
const {
  loginHandler,
  getUserId,
  signUpHandler,
} = require("../controllers/login");
const db = require("../models");

const { updateBook, createBook } = require("../controllers/books");
const { updateUser } = require("../controllers/users");
const updateUserInputType = require("./types/updateUserInputType");
const userType = require("./types/userType");

const {updateAuthor} = require("../controllers/authors");
const updateAuthorInputType = require("./types/updateAuthorInputType");
const authorType = require("./types/authorType");

const updateReadingStatusInputType = require("./types/updateReadingStatusInputType");
const {updateReadingStatus, createReview} = require("../controllers/reviews");
const reviewType = require("./types/reviewType");

const createListInputType = require("./types/inputTypes/createListInputType");
const listType = require("./types/listType");
const {createList, addBookToList, removeBookFromList, mergeLists, getListById} = require("../controllers/lists");

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createBook: {
      type: bookType,
      args: {
        createBook: {
          type: createBookInputType,
        },
      },
      resolve: async (source, args) => {
        return await createBook(args.createBook);
      },
    },
    login: {
      type: loginResultType,
      args: {
        loginInput: {
          type: loginInputType,
        },
      },
      resolve: async (source, args) => {
        const { email, password } = args.loginInput;

        const token = loginHandler(email, password);

        return { token };
      },
    },
    signup: {
      type: loginResultType,
      args: {
        signupInput: {
          type: signupInputType,
        },
      },
      resolve: async (source, args) => {
        const { name, email, password } = args.signupInput;

        const token = signUpHandler(name, email, password);

        return { token };
      },
    },
    updateUser: {
      type: userType,
      args: {
        updateUserInput: {
          type: updateUserInputType,
        },
      },
      resolve: async (source, args, context) => {
        return updateUser(args.updateUserInput, context);
      },
    },
    updateAuthorInput: {
      type: authorType,
      args: {
        updateAuthorInput: {
          type: updateAuthorInputType,
        },
      },
      resolve: async(source,args,context) =>{
        return updateAuthor(args.updateAuthorInput,context);
      }
    },

    updateReadingProgress: {
      type: reviewType,
      args: {
        readingStatusInput: {
          type: updateReadingStatusInputType,
        }
      },
      resolve: async(source,args,context) => {
        return updateReadingStatus(args.readingStatusInput,context);
      }
    },
    
    getListById:{
      type: listType,
      args: {
        listId: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: async(source,args,context) => {
          return await getListById(source,args,context);
      }
    },

    createBookList: {
      type: listType,
      args: {
        createListInput: {
          type: createListInputType,
        }
      },
      resolve: async(source,args,context) => {
        return await createList(source,args.createListInput,context);
      },
    },

    addBookToList: {
      type: listType,
      args: {
        listId: {
          type: new GraphQLNonNull(GraphQLID)
        },
        bookId: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: async(source,args,context) => {
        return await addBookToList(source,args,context);
      }
    },

    removeBookFromList: {
      type: listType,
      args: {
        listId: {
          type: new GraphQLNonNull(GraphQLID)
        },
        bookId: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: async(source,args,context) => {
        return await removeBookFromList(source,args,context);
      }
    },

    mergeLists: {
      type: listType,
      args: {
        listId: {
          type: new GraphQLNonNull(GraphQLID)
        },
        mergeListId: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: async(source,args,context) => {
        return await mergeLists(source,args,context);
      }
    },

    createReview:{
      type: reviewType,
      args: {
        bookId: {
          type: new GraphQLNonNull(GraphQLID)
        },
        rating:{
          type: new GraphQLNonNull(GraphQLInt)
        },
        comment:{
          type: new GraphQLNonNull(GraphQLString)
        },
      },
      resolve: async(source,args,context) => {
        return await createReview(args,context);
      }

    }

  },
});
module.exports = mutationType;
