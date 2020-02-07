
const async = require('async')

const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')
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
    Information.find({}, 'title author')
        .populate('author')
        .exec(function (err, list_informations) {
            if (err) {
                return next(err)
            }
            res.render('information_list', { title: 'Information List', information_list: list_informations })
        })
}

exports.information_detail = function (req, res, next) {
    async.parallel({
        information: function (callback) {
            Information.findById(req.params.id)
                .populate('author')
                .populate('genre')
                .exec(callback)
        },
        info_instance: function (callback) {
            infromationInstance.find({ 'information': req.params.id })
                .exec(callback)
        }
    }, function (err, result) {
        if (err) { return next(err) }
        if (result.information === null) {
            let err = new Error('Information not found')
            err.status = 404
            return next(err)
        }
        console.log(result)

        res.render('info_detail', { title: result.information.title, information: result.information, info_instance: result.info_instance })
    })
}

exports.information_create_get = function (req, res) {
    async.parallel({
        authors: function (callback) {
            Author.find(callback)
        },
        genres: function (callback) {
            Genre.find(callback)
        }
    }, function (err, results) {
        if (err) { return next(err) }
        res.render('information_form', { title: 'Create Book', authors: results.authors, genres: results.genres })
    })
}

exports.information_create_post = [
    //convert the genre to an array
    (req, res, next) => {
        if (!(req.body.genre instanceof Array)) {
            if (typeof req.body.genre === 'undefined')
                req.body.genre = []
            else
                req.body.genre = new Array(req.body.genre)
        }
        next()
    },

    //validate fields
    body('title', 'Title must not be empty').isLength({ min: 1 }).trim(),
    body('author', 'Author must not be empty').isLength({ min: 1 }).trim(),
    body('contents', 'Contents must not be empty').isLength({ min: 1 }).trim(),
    sanitizeBody('*').escape(),

    (req, res, next) => {
        const errors = validationResult(req)
        //Create information object with escaped and trimmed data
        let information = new Information({
            title: req.body.title,
            author: req.body.author,
            contents: req.body.contents,
            genre: req.body.genre
        })

        if (!errors.isEmpty()) {

            //Get all authors and genres for form
            async.parallel({
                authors: function (callback) {
                    Author.find(callback)
                },
                genres: function (callback) {
                    Genre.find(callback)
                }
            }, function (err, results) {
                if (err) { return next(err) }

                //Mark our selected genres as checked
                for (let index = 0; index < results.genres.length; index++) {
                    if (information.genre.indexOf(results.genres[index]._id) > -1) {
                        results.genres[index].checked = "true"
                    }
                }

                res.render('information_form', { authors: results.authors, genres: results.genres, information: information, errors: errors.array() })
            })

            return
        }

        else {
            information.save(function (err) {
                if (err) { return next(err) }
                res.redirect(information.url)
            })
        }
    }
]

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