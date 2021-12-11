const { isTokenIncluded, getAccessTokenFromHeaders } = require('../../helpers/authorization/tokenHelpers');
const CustomError = require('../../helpers/error/CustomError');
const Job = require('../../model/Job');
const jwt = require('jsonwebtoken');
const expressAsyncHandler = require('express-async-handler');


const getAccessToRoute = expressAsyncHandler(async (req, res, next) => {
    const { JWT_SECRET_KEY } = process.env;
    if (!isTokenIncluded(req)) {
        return next(
            new CustomError('You are not authorized to access this route', 401)
        );
    }
    const accessToken = getAccessTokenFromHeaders(req);
    if (accessToken){
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
    }
});

const getJobOwnerAccess = expressAsyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const jobId = req.params.jobId;
    const job = await Job.findById(jobId);
    if (job.createdBy != userId) {
        return next(new CustomError('Only owner can access this operation', 403));
    }
    next();
});
module.exports = {
    getAccessToRoute,
    getJobOwnerAccess
};