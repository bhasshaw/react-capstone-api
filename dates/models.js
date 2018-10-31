'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const dateSchema = mongoose.Schema({
    user: {
        type: String
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
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
        street: this.street,
        city: this.city,
        state: this.state,
        zip: this.zip,
        date: this.date,
        time: this.time
    };
};

const Date = mongoose.model('Service', dateSchema);

module.exports = {Date};