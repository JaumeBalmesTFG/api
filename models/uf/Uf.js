// Uf Model
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ufSchema = new Schema({

    moduleId: {
        type: Schema.Types.ObjectId,
        required: true
    },

    name: {
        type: String,
        //maxlength: 30,
        required: true,
        unique: true
    },

    hours: {
        type: Number,
        required: true,
    },

    truancy_percentage: {
        type: Number,
        required: true,
        default: 0,
    },

    total_hours_left: {
        type: Number,
    }

}, { timestamps: true });

// Exports
module.exports = mongoose.model("Uf", ufSchema);