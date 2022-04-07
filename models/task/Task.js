// Task Model

const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({

    authorId: {
        type: Schema.Types.ObjectId,
        required: true
    },

    ufId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    
    name: {
        type: String,
        required: true
    },

    grade: {
        type: Schema.Types.Decimal128,
        default: null,
    },

    description: {
        type: String,
        required: true
    },

    dueDate: {
        type: Date,
        required: true
    },

    done: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);