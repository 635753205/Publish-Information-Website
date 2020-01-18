const genre =  require('../models/genre')

exports.genre_list = function(req,res){
    res.send('NOT IMPLEMENTED: Genre list')
}

exports.genre_detail = function(req,res){
    res.send('NOT IMPLEMENTED:Genre detail:' + req.params.id)
}
