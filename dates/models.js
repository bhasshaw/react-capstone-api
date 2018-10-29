'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const dateSchema = mongoose.Schema({
    user: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    parkName: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

dateSchema.methods.serialize = function() {
    return {
        id: this._id,
        city: this.city,
        parkName: this.parkName,
        date: this.date,
        time: this.time
    };
};

const Service = mongoose.model('Service', dateSchema);

module.exports = {Date};