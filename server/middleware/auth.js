const jwt = require('jsonwebtoken');
const { config } = require('dotenv');
const { errorResponse } = require('../utils/error');

config();

exports.jwtCheck = async (req, res, next) => {
    try {
        const header = req.get('Authorization')?.split(" ")[1];
        if (!header) throw new Error();
        const decodedToken = await jwt.verify(header, process.env.JWT_SECRET_KEY);
        if (!decodedToken) throw new Error();
        req.userId = decodedToken.userId;
        req.isAuth = true;
        next();
    } catch (err) {
        req.userId = null;
        req.isAuth = false
        next()
    }
}

exports.editUser = async (req, res, next) => {
    try {
        if (!req.isAuth || !req.userId) {
            return errorResponse("Not authenticated", 401);
        }
        next()
    } catch (err) {
        next(err)
    }
}