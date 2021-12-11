const { isTokenIncluded, getAccessTokenFromHeaders } = require('../../helpers/authorization/tokenHelpers');
const CustomError = require('../../helpers/error/CustomError');
const jwt = require('jsonwebtoken');
const expressAsyncHandler = require('express-async-handler');


const getAccessToRoute = expressAsyncHandler(async (req, res, next) => {
    const { JWT_SECRET_KEY } = process.env;
    const accessToken = getAccessTokenFromHeaders(req);
    if (!isTokenIncluded(req)) {
        return next(
            new CustomError('You are not authorized to access this route', 401)
        );
    }
    jwt.verify(accessToken, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return next(new CustomError('You are mot authorized to access this route', 401));
        }
        req.user = {
            id: decoded.id,
            name: decoded.name
        };
        next();
    });
});
module.exports = {
    getAccessToRoute
};