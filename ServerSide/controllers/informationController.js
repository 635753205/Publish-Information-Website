
const async = require('async')

const information = require('../models/information')
const Author = require('../models/author')
const Genre = require('../models/genre')
const infromationInstance = require('../models/infoInstance')

exports.index = function(req,res){
    async.parallel({
        information_counts:function(callback){
            information.countDocuments({},callback)
        },
        information_instance_count:function(callback){
            infromationInstance.countDocuments({},callback)
        },
        author_count:function(calllback){
            Author.countDocuments({},calllback)
        },
        genre_count:function(callback){
            Genre.countDocuments({},callback)
        }
    },function(err,result){
        res.render('index',{title:'Informations',error:err,data:result
        })
    })
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