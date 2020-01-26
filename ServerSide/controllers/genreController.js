const async = require('async')

const information = require('../models/information')
const Genre = require('../models/genre')

exports.genre_list = function (req, res, next) {
    Genre.find()
        .exec(function (err, list_genres) {
            if (err) { return next(err) }
            res.render('genre_list', { title: 'Genre List', genre_list: list_genres })
        })
}

exports.genre_detail = function (req, res,next) {
    async.parallel({
        genre: function (callback) {
            Genre.findById(req.params.id)
                .exec(callback)
        },

        genre_informations: function (callback) {
            information.find({ 'genre': req.params.id })
                .exec(callback)
        }
    },function(err,result){
        if(err) {return next(err)}
        if(result.genre === null){
            console.log(`can not find the genre `);
            let err = new Error('Genre not find')
            err.status = 404
            return next(err)
        }
        res.render('genre_detail',{title:'Genre Detail',genre:result.genre,genre_informations: result.genre_informations})
    })
}

exports.genre_create_get = function (req, res) {
    res.send('NOT IMPLEMENTED:GENRE CREATE GET')
}

exports.genre_create_post = function (req, res) {
    res.send('NOT IMPLEMENTED:GENRE CREATE POST')
}

exports.genre_delete_get = function (req, res) {
    res.send('NOT IMPLEMENTED:GENRE DELETE GET')
}

exports.genre_delete_post = function (req, res) {
    res.send('NOT IMPLEMENTED:GENRE DELETE POST')
}

exports.genre_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED:GENRE UPDATE GET')
}

exports.genre_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED:GENRE UPDATE POST')
}