var recipes = require('../models/recipes');

exports.list = function (req, res) {
    var id = req.query.id || req.params.id;

    Promise.resolve()
        .then(function () {
            if (id) {
                return recipes.findById(id);
            } else {
                return recipes.find();
            }
        })
        .then(function (data) {
            if (data) {
                res.json(data);
            }
        })
        .catch(function (err) {
            console.log('Error at ' + err);
        })
}

exports.add = function (req, res) {
    var postData = Object.keys(req.query).length !== 0 ? req.query : Object.keys(req.body).length !== 0 ? req.body : null;

    var entry = recipes({
        name: postData.name,
        led1: postData.led1,
        led2: postData.led2,
        led3: postData.led3,
        fadeUpTime: postData.fadeUpTime,
        fadeUpDuration: postData.fadeUpDuration,
        fadeDownTime: postData.fadeDownTime,
        fadeDownDuration: postData.fadeDownDuration
    });

    Promise.resolve()
        .then(function () {
            return entry.save();
        })
        .then(function (recipeDataUpdate) {
            res.json({ status: "OK" });
        })
        .catch(function (err) {
            console.log('Error at ' + err);
        })
}

exports.update = function (req, res) {
    var postData = Object.keys(req.query).length !== 0 ? req.query : Object.keys(req.body).length !== 0 ? req.body : null;

    var entry = {
        name: postData.name,
        led1: postData.led1,
        led2: postData.led2,
        led3: postData.led3,
        fadeUpTime: postData.fadeUpTime,
        fadeUpDuration: postData.fadeUpDuration,
        fadeDownTime: postData.fadeDownTime,
        fadeDownDuration: postData.fadeDownDuration
    };

    Promise.resolve()
        .then(function () {
            return recipes.findByIdAndUpdate(postData.id, entry);
        })
        .then(function (recipeDataUpdate) {
            res.json({ status: "OK" });
        })
        .catch(function (err) {
            console.log('Error at ' + err);
        })
}

exports.delete = function (req, res) {
    var postData = Object.keys(req.query).length !== 0 ? req.query : Object.keys(req.body).length !== 0 ? req.body : null;

    Promise.resolve()
        .then(function () {
            return recipes.findByIdAndRemove(postData.id)
        })
        .then(function (recipeDataUpdate) {
            res.json({ status: "OK" });
        })
        .catch(function (err) {
            console.log('Error at ' + err);
        })
}