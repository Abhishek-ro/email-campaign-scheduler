
const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    userId: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    name: {
        type: String
    },

}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);