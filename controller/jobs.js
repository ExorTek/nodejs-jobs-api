const Job = require('../model/Job');
const expressAsyncHandler = require('express-async-handler');
const CustomError = require("../helpers/error/CustomError");

const getAllJobs = expressAsyncHandler(async (req, res, next) => {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt');
    if (!jobs) {
        return next(new CustomError('you don\'t seem to have a job'), 400);
    }
    return res.status(200).json({
        success: true,
        data: jobs,
        count: jobs.length
    });
});

const getSingleJob = expressAsyncHandler(async (req, res, next) => {

});
const createJob = expressAsyncHandler(async (req, res, next) => {

});
const updateJob = expressAsyncHandler(async (req, res, next) => {

});
const deleteJob = expressAsyncHandler(async (req, res, next) => {

});

module.exports = {
    getAllJobs,
    getSingleJob,
    createJob,
    updateJob,
    deleteJob
};