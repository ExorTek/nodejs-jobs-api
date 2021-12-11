const express = require('express');
const router = express.Router();
const { getAllJobs, getSingleJob, createJob, updateJob, deleteJob } = require('../controller/jobs');
const { getAccessToRoute } = require('../middleware/authorization/auth');
const { checkJobExist } = require('../middleware/database/databaseErrorHelper');
const { getJobOwnerAccess } = require('../middleware/authorization/auth');

router.get('/', getAccessToRoute, getAllJobs);
router.get('/:jobId', checkJobExist, getSingleJob);
router.post('/', getAccessToRoute, createJob);
router.put('/:jobId/edit', [getAccessToRoute, checkJobExist, getJobOwnerAccess], updateJob);
router.delete('/:jobId/delete', [getAccessToRoute, checkJobExist, getJobOwnerAccess], deleteJob);


module.exports = router;