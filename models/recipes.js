var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var recipes = new Schema({
    name: String,
    led1: Number,
    led2: Number,
    led3: Number,
    fadeUpTime: Number,
    fadeUpDuration: Number,
    fadeDownTime: Number,
    fadeDownDuration: Number
});

module.exports = mongoose.model('recipes', recipes);