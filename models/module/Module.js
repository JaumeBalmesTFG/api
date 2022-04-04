// Module Model

const mongoose = require('mongoose');
const { Schema } = mongoose;

const moduleSchema = new Schema({
    authorId: {
        type: Schema.Types.ObjectId,
        required: true
    },

    name: {
        type: String,
        //maxlength: 30,
        required: true,
    },

    color: {
        type: String,
        maxlength: 7,
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