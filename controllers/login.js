const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config/jwt").JWT_SECRET;
const bcrypt = require("bcryptjs");
const db = require("../models");

function getTokenPayload(token) {
  return jwt.verify(token, JWT_SECRET);
}

function getUserId(req, authToken) {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      if (!token) {
        throw new Error("No token found");
      }
      const { id } = getTokenPayload(token);
      return id;
    }
  } else if (authToken) {
    const { id } = getTokenPayload(authToken);
    return id;
  }

  throw new Error("Not authenticated");
}

const loginHandler = async (email, password) => {
  const user = await db.User.findOne({
    where: {
      email,
    },
  });
  const valid = await bcrypt.compare(password, user.password);
  if (valid) {
    return jwt.sign(
      {
        id: user.id,
      },
      JWT_SECRET
    );
  } else {
    return null;
  }
};

const signUpHandler = async (name, email, password) => {
  let user = await db.User.findOne({
    where: {
      email,
    },
  });

  if (user) {
    return null;
  } else {
    password = await bcrypt.hash(password, 10);
    user = await db.User.create({
      username:name,
      email,
      password,
    });
    return jwt.sign({ id: user.id }, JWT_SECRET);
  }
};

module.exports = {
  getUserId,
  loginHandler,
  signUpHandler,
};
