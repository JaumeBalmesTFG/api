// User Model

const mongoose = require('mongoose');
const { Schema } = mongoose;

// User Model
const userSchema = new Schema({
    firstName: {
        type: String,
        maxlength: 25,
        required: true,
    },

    lastName: {
        type: String,
        maxlength: 25,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    token: {
        type: String,
        default: null,
        required: true,
    }

    // Automatic creation and update time setting 
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);