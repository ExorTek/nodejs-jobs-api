const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email'
        ]
    },
    role: {
        type: String,
        enum: ['worker', 'admin', 'expert'],
        default: 'worker'
    },
    password: {
        select: false,
        type: String,
        minlength: 6,
        required: [true, 'Please provide a password']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    profile_image: {
        type: String,
        default: 'default.jpg'
    }
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    await bcrypt.genSalt(10, async (err, salt) => {
        if (err) next(err);
        await bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) next(err);
            this.password = hash;
            next();
        });
    });
});
UserSchema.methods.generateJwtFromUser = function () {
    const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;
    const payload = {
        id: this._id,
        name: this.name,
        createdAt: this.createdAt
    };
    return jwt.sign(payload, JWT_SECRET_KEY, {
        expiresIn: JWT_EXPIRE
    });
};

module.exports = mongoose.model('User', UserSchema);