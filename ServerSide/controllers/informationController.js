const information = require('../models/information')

exports.index = function(req,res){
    res.send('NOT IMPLEMENTED: Site Home Page')
}

exports.information_list = function(req,res){
    res.send('NOT IMPLEMENTED: information list');
}

exports.information_detail = function(req,res){
    res.send('NOT IMPLEMENTED: information detail: ' + req.params.id)
}

exports.information_create_get = function(req,res){
    res.send('NOT IMPLEMENTED: information create get')
}

exports.information_create_post = function(req,res){
    res.send('NOT IMPLEMENTED:INFORMATION CREATE POST')
}

exports.information_delete_get = function(req,res){
    res.send('NOT IMPLEMENTED:INFORMATION DELETE GET')
}

exports.information_delete_post = function(req,res){
    res.send('NOT IMPLEMENTED:INFORMATION DELETE POST')
}

exports.information_update_get = function(req,res){
    res.send('NOT IMPLEMENTED:INFORMATION UPDATE GET')
}

exports.information_update_post = function(req,res){
    res.send('NOT IMPLEMENTED:INFORMATION UPDATE POST')
}