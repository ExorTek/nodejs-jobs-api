const Job = require('../model/Job');
const expressAsyncHandler = require('express-async-handler');
const CustomError = require("../helpers/error/CustomError");

const getAllJobs = expressAsyncHandler(async (req, res, next) => {
    const jobs = await Job.find({ createdBy: req.user.id }).sort('createdAt');
    if (!jobs) {
        return next(new CustomError('You don\'t seem to have a job'), 400);
    }
    return res.status(200).json({
        success: true,
        data: jobs,
        count: jobs.length
    });
});

const getSingleJob = expressAsyncHandler(async (req, res, next) => {
    const { jobId } = req.params;
    const job = await Job.findById(jobId).populate({
        path: 'createdBy',
        select: 'name role profile_image'
    });
    return res.status(200).json({
        success: true,
        data: job
    });
});
const createJob = expressAsyncHandler(async (req, res, next) => {
    const { company, position } = req.body;
    console.log(company, position)
    const job = await Job.create({
        company: company,
        position: position,
        createdBy: req.user.id
    });
    return res.status(200).json({
        success: true,
        data: job
    })
});
const updateJob = expressAsyncHandler(async (req, res, next) => {
    const { jobId } = req.params;
    const { status } = req.body;
    let job = await Job.findById(jobId);
    job.status = status;
    job = await job.save();
    return res.status(200).json({
        success: true,
        data: job
    });
});
const deleteJob = expressAsyncHandler(async (req, res, next) => {
    const { jobId } = req.params;
    await Job.findByIdAndDelete(jobId);
    return res.status(200).json({
        success: true,
        message: 'Job deleted successfully'
    });
});

module.exports = {
    getAllJobs,
    getSingleJob,
    createJob,
    updateJob,
    deleteJob
};