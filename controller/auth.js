const User = require('../model/User');
const expressAsyncHandler = require('express-async-handler');
const CustomError = require("../helpers/error/CustomError");
const { validateUserInput, comparePassword } = require('../helpers/lib/inputHelper');
const { sendJwtToClient } = require('../helpers/authorization/tokenHelpers');
const register = expressAsyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password
    });
    sendJwtToClient(user, res);
});

const login = expressAsyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!validateUserInput(email, password)) {
        return next(new CustomError('Please don\'t empty the password and email!', 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (user === null) {
        return next(new CustomError('User does not exist!'));
    }
    if (!comparePassword(password, user.password)) {
        return next(new CustomError('Please check the password!'));
    }
    sendJwtToClient(user, res);
});

module.exports = {
    register,
    login
};