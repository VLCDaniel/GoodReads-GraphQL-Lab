const jwt = require('jsonwebtoken');
const JWT_SECRET = require("../config/jwt").JWT_SECRET;
const db = require("../models");

const authorizationMiddleware = async(req, res, next) => {
    const authorization = req.headers.authorization;

    if(authorization){
        try{
            const decoded = jwt.verify(authorization.replace('Bearer ',''), JWT_SECRET);
            const userId = decoded.id;

            const user = await db.User.findByPk(userId);
            if(user){
                req.user = user;
                next();
            }
        }catch (e) {
            console.error('error',e);
            next();
        }
    }else{
        next();
    }
}

module.exports = authorizationMiddleware;