const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    company: {
        type: String,
        required: [true, 'Please provide company name'],
        minlength: [3, 'Company name must be greater than 3 characters']
    },
    position: {
        type: String,
        required: [true, 'Please provide position'],
        minlength: [3,'Position must be greater than 3 characters'],
    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },
});
module.exports = mongoose.model('Job', JobSchema);