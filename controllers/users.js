const db = require('../models');

module.exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await db.User.findAll();
    return allUsers;
  } catch (error) {
    console.error('Something went wrong');
    res.send({
      error: "Something went wrong",
    });
  } 
}

// Return User
module.exports.getUserById = async (req, res) => {
    try {
        const user = await db.User.findByPk(req.params.id);
        res.send(user);
    } catch (err) {
        console.error('Something went wrong');
        res.send({
            error: "Something went wrong",
        });
    }
}

module.exports.createUser = async (req, res) => {
    const {
      email,
      firstName,
      lastName,
    } = req.body
  
    try {
      const newUser = await db.User.create({
        email,
        firstName,
        lastName,
      });
  
      res.status(201).send(newUser);
    } catch (error) {
      console.error(error);
      res.send({
        error: "Something went wrong",
      });
    }
}

// Updated User
module.exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await db.User.update(req.body, {
            where:
            {
                id: req.params.id
            }
        });
        this.getUserById(req, res);
    } catch (error) {
        console.error('Something went wrong');
        res.send({
            error: "Something went wrong",
        });
    }

}

module.exports.deleteUser = async (req, res) => {
    try{
        const ob = await db.User.destroy({
            where:
            {
                id: req.params.id
            }
        });
        res.status(204).send();
    } catch (err) {
        console.error('Something went wrong');
        res.send({
            error: "Something went wrong",
        });
    }
}