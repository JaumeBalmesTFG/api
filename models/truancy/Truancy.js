// Truancy Model

const mongoose = require('mongoose');
const { Schema } = mongoose;

const moduleSchema = new Schema({
    ufId: {
        type: Schema.Types.ObjectId,
        required: true
    },

    date: {
        type: Date,
        required: true,
    },

    reason: {
        type: String,
        required: true,
    },

    hours: {
        type: Number,
        default: false,
        required: true
    },
}, { timestamps: true });

// Exports
module.exports = mongoose.model("Truancy", moduleSchema);