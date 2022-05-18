// Task Model

const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({

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

    ruleId: {
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
        type: String
    },

    dueDate: {
        type: Date,
        required: true
    },

    done: {
        type: Boolean,
        default: false
    },

    archived: {
        type: Boolean,
        default: false,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);