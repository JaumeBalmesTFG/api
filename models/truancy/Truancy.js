// Truancy Model

const mongoose = require('mongoose');
const { Schema } = mongoose;

const moduleSchema = new Schema({

    authorId: {
        type: Schema.Types.ObjectId,
        required: true
    },

    moduleId: {
        type: Schema.Types.ObjectId,
        required: true
    },

    ufId: {
        type: Schema.Types.ObjectId,
        required: true
    },

    date: {
        type: Date,
        required: true,
    },

    reason: {
        type: String
    },

    hours: {
        type: Number,
        default: false,
        required: true
    },

    archived: {
        type: Boolean,
        default: false,
        required: true
    }

}, { timestamps: true });

// Exports
module.exports = mongoose.model("Truancy", moduleSchema);