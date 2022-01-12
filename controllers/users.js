const db = require("../models");
const {Op} = require("sequelize");
const Permissions = require("../config/permissions")

module.exports.getAllUsers = async () => {
  try {
    const allUsers = await db.User.findAll();
    return allUsers;
  } catch (error) {
    console.error("Something went wrong");
    res.send({
      error: "Something went wrong",
    });
  }
};

// Return User
module.exports.getUserById = async (id) => {
  try {
    const user = await db.User.findByPk(id);
    return user;
  } catch (err) {
    console.error("Something went wrong getting the user");
    return null;
  }
};

module.exports.createUser = async (args) => {
  const { email, firstName, lastName } = args;

  try {
    const newUser = await db.User.create({
      email,
      firstName,
      lastName,
    });

    return newUser;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Updated User
module.exports.updateUser = async (args, context) => {
  const userId  = context.user.id;

  try {
    const updatedUser = await db.User.update(args, {
      where: {
        id: userId,
      },
    });
    return this.getUserById(userId);
  } catch (error) {
    console.error("Something went wrong updating the user");
    return null;
  }
};

module.exports.deleteUser = async (id) => {

  const {user} = context;
  
  const hasPermission = await user.can(Permissions.DELETE_USER);

  if(!hasPermission) {
    return null;
  }
  
  try {
    const ob = await db.User.destroy({
      where: {
        id: id,
      },
    });
    return null;
  } catch (err) {
    console.error("Something went wrong");
    return null;
  }
};


module.exports.getSimilarityProfile = async (otherUserId,context) => {
  const {user} = context;
  if(user.id == otherUserId) {
    return null;
  }
  try {
    let books = await db.Review.findAll({
      where: {
        [Op.or]: [
          {
            userId: user.id, 
          },
          {
            userId: otherUserId,
          }
        ]
      },
      include:[ 
        {
          model: db.Book,
          as: "Book",
          attributes: ["id", "title"]
        }
      ]
    })
    
    let reptedBooks = books.filter((v,i,a)=> a.filter(t=>(t.Book.id == v.Book.id)).length > 1)

    let uniqueBooks = reptedBooks.map(v=>v.Book.id)
    uniqueBooks = [...new Set(uniqueBooks)]


    let returnBooks = uniqueBooks.map( v=> db.Book.findByPk(v))

    return await Promise.all(returnBooks);

    
  }catch(e){
    console.log(e);
  }
}

