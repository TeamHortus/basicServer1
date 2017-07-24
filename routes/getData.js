var recipe1 = require('../models/recipe1');

exports.list = function (req, res) {

    Promise.resolve()
        .then(function () {
            return recipe1.find();
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
    Promise.resolve()
        .then(function () {
            return recipe1.findOne();
        })
        .then(function (recipeData) {
            if (recipeData) {
                return recipe1.findByIdAndUpdate(recipeData.id, postData);
            }
        })
        .then(function (recipeDataUpdate) {
            res.json({ status: "OK" });
        })
        .catch(function (err) {
            console.log('Error at ' + err);
        })
}