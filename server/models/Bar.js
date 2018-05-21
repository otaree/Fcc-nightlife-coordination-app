const mongoose = require('mongoose');

const BarSchema = new mongoose.Schema({
    location: {
        type: String,
        trim: true,
        unique: true,
        minlength: 1
    },
    businesses: {
        type: Array,
        default: []
    }

});

const Bar = mongoose.model('Bar', BarSchema);

module.exports = { Bar };