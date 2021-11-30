const express = require('express');
const router = express.Router();
const { getAllJobs, getSingleJob, createJob, updateJob, deleteJob } = require('../controller/jobs');

router.get('/', getAllJobs);
router.get('/:id', getSingleJob);
router.post('/', createJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);


module.exports = router;