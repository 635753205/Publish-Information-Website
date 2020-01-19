const genre =  require('../models/genre')

exports.genre_list = function(req,res){
    res.send('NOT IMPLEMENTED: Genre list')
}

exports.genre_detail = function(req,res){
    res.send('NOT IMPLEMENTED:Genre detail:' + req.params.id)
}

exports.genre_create_get = function(req,res){
    res.send('NOT IMPLEMENTED:GENRE CREATE GET')
}

exports.genre_create_post = function(req,res){
    res.send('NOT IMPLEMENTED:GENRE CREATE POST')
}

exports.genre_delete_get = function(req,res){
    res.send('NOT IMPLEMENTED:GENRE DELETE GET')
}

exports.genre_delete_post = function(req,res){
    res.send('NOT IMPLEMENTED:GENRE DELETE POST')
}

exports.genre_update_get = function(req,res){
    res.send('NOT IMPLEMENTED:GENRE UPDATE GET')
}

exports.genre_update_post = function(req,res){
    res.send('NOT IMPLEMENTED:GENRE UPDATE POST')
}