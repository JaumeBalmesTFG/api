// Rule Model

const mongoose = require('mongoose');
const { Schema } = mongoose;

const moduleSchema = new Schema({
    ufId: {
        type: Schema.Types.ObjectId,
        required: true
    },

    title: {
        type: String,
        required: true,
    },

    percentage: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

// Exports
module.exports = mongoose.model("Rule", moduleSchema);