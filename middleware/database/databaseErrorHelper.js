const expressAsyncHandler = require('express-async-handler');
const Job = require('../../model/Job');
const CustomError = require("../../helpers/error/CustomError");
const checkJobExist = expressAsyncHandler(async (req, res, next) => {
    const jobId = req.params.jobId;
    const job = await Job.findById(jobId);
    if (!job) {
        return next(new CustomError('There is no such job in this id!', 400));
    }
    next();
});
module.exports = {checkJobExist};