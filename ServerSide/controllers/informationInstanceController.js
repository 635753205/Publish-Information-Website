const informationInstance = require('../models/infoInstance')
exports.infoInstance_list = function(req,res,next){
    informationInstance.find()
    .populate('information')
    .exec(function(err,list_information_instance) {
        if(err){return next(err)}
        res.render('infoInstance_list',{title:'Information Instance List',information_instance_list:list_information_instance})
    })
}

exports.infoInstance_detail = function(req,res){
    res.send('NOT IMPLEMENTED: informations detail: ' + req.params.id)
}

exports.infoInstance_create_get = function(req,res){
    res.send('NOT IMPLEMENTED:information instance create get')
}

exports.infoInstance_create_post = function(req,res){
    res.send('NOT IMPLEMENTED:INFOINSTANCE CREATE GET')
}

exports.infoInstance_delete_get = function(req,res){
    res.send('NOT IMPLEMENTED:INFOINSTANCE DELETE GET')
}

exports.infoInstance_delete_post = function(req,res){
    res.send('NOT IMPLMENTED:INFOINSTANCE DELETE GET')
}

exports.infoInstance_update_get = function(req,res){
    res.send('NOT IMPLEMENTED:INFOINSTANCE DELETE GET')
}

exports.infoInstance_update_post = function(req,res){
    res.send('NOT IMPLEMENTED:INFOINSTANCE UPDATE POST')
}