const async = require('async')
const informationInstance = require('../models/infoInstance')

exports.infoInstance_list = function(req,res,next){
    informationInstance.find()
    .populate('information')
    .exec(function(err,list_information_instance) {
        if(err){return next(err)}
        console.log(list_information_instance)
        res.render('infoInstance_list',{title:'Information Instance List',information_instance_list:list_information_instance})
    })
}

exports.infoInstance_detail = function(req,res,next){
    informationInstance.findById(req.params.id)
    .populate('information')
    .exec(function(err,information_instance){
        if(err){return next(err)}
        if(information_instance === null){
            let err = new Error('Can not find the information instance')
            err.status = 404
            return next(err)
        }
        console.log(information_instance)
        res.render('information_instance_detail',{title:`Information:${information_instance.title}`,instance_information:information_instance})
    })
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