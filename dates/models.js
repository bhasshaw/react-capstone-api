'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const dateSchema = mongoose.Schema({
    username: {
        type: String
    },
    park: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
    // date: { type: Date, default: new Date() }
});

dateSchema.methods.serialize = function() {
    return {
        id: this._id,
        username: this.username,
        park: this.park,
        date: this.date,
        startTime: this.startTime,
        endTime: this.endTime
    };
};

const Date = mongoose.model('Date', dateSchema);

module.exports = {Date};