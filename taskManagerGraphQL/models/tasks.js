const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    creator: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now()
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    status: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Task', taskSchema)