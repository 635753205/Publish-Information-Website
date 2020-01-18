const information = require('../models/information')

exports.index = function(req,res){
    res.send('NOT IMPLEMENTED: Site Home Page')
}

exports.information_list = function(req,res){
    res.send('NOT IMPLEMENTED: information list');
}

exports.information_detail = function(req,res){
    res.send('NOT IMPLEMENTED: BookInstance detail: ' + req.params.id)
}