var recipe1 = require('../models/recipe1');

exports.list = function(req,res){

    Promise.resolve()
    .then(function(){
        return recipe1.findOne();
    })
    .then(function(data){
        if(data){
            console.log(data.led1);
        }
        res.json(data);
    })
    .catch(function(err){
        console.log('Error at '+ err);
    })



}

exports.add = function(req,res){

}