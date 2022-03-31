// Module Model

const mongoose = require('mongoose');
const { Schema } = mongoose;

const moduleSchema = new Schema({
    // authorId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true
    // },

    name: {
        type: String,
        //maxlength: 30,
        required: true,
        unique: true
    },

    color: {
        type: String,
        maxlength: 6,
        required: true,
    },

    archived: {
        type: Boolean,
        default: false,
        required: true
    },
}, { timestamps: true });

// Exports
module.exports = mongoose.model("Module", moduleSchema);