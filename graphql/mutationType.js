const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
} = require("graphql");

const bookType = require("./types/bookType");
//TODO cahnge this to eng with "-input"
const createBookType = require("./types/createBookType");
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

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createBook: {
      type: bookType,
      args: {
        createBook: {
          type: createBookType,
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
        const { email, password } = args.signupInput;

        const token = signUpHandler(email, password);

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
  },
});
module.exports = mutationType;
