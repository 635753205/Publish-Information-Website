
const async = require('async')

const Information = require('../models/information')
const Author = require('../models/author')
const Genre = require('../models/genre')
const infromationInstance = require('../models/infoInstance')

exports.index = function (req, res) {
    async.parallel({
        information_counts: function (callback) {
            Information.countDocuments({}, callback)
        },
        information_instance_count: function (callback) {
            infromationInstance.countDocuments({}, callback)
        },
        author_count: function (calllback) {
            Author.countDocuments({}, calllback)
        },
        genre_count: function (callback) {
            Genre.countDocuments({}, callback)
        }
    }, function (err, result) {
        res.render('index', {
            title: 'Informations', error: err, data: result
        })
    })
}

exports.information_list = function (req, res, next) {
    Information.find({},'title author')
        .populate('author')
        .exec(function (err, list_informations) {
            if (err) {
                return next(err)
            } 
            res.render('information_list', { title: 'Information List', information_list: list_informations})
        })
}

exports.information_detail = function (req, res,next) {
    async.parallel({
        information: function (callback) {
            Information.findById(req.params.id)
                .populate('Author')
                .populate('Genre')
                .exec(callback)
        },
        info_instance:function(callback){
            infromationInstance.find({'info':req.params.id})
            .exec(callback)
        }
    },function(err,result) {
        if(err){ return next(err) }
        if(result.information === null){
            let err = new Error('Information not found')
            err.status = 404
            return next(err)
        }

        res.render('info_detail',{title:result.information.title,information:result.information,info_instance:result.info_instance})
    })
}

exports.information_create_get = function (req, res) {
    res.send('NOT IMPLEMENTED: information create get')
}

exports.information_create_post = function (req, res) {
    res.send('NOT IMPLEMENTED:INFORMATION CREATE POST')
}

exports.information_delete_get = function (req, res) {
    res.send('NOT IMPLEMENTED:INFORMATION DELETE GET')
}

exports.information_delete_post = function (req, res) {
    res.send('NOT IMPLEMENTED:INFORMATION DELETE POST')
}

exports.information_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED:INFORMATION UPDATE GET')
}

exports.information_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED:INFORMATION UPDATE POST')
}