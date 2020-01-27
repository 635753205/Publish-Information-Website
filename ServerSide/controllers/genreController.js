const async = require('async')
const validator = require('express-validator')

const information = require('../models/information')
const Genre = require('../models/genre')

exports.genre_list = function (req, res, next) {
    Genre.find()
        .exec(function (err, list_genres) {
            if (err) { return next(err) }
            res.render('genre_list', { title: 'Genre List', genre_list: list_genres })
        })
}

exports.genre_detail = function (req, res, next) {
    async.parallel({
        genre: function (callback) {
            Genre.findById(req.params.id)
                .exec(callback)
        },

        genre_informations: function (callback) {
            information.find({ 'genre': req.params.id })
                .exec(callback)
        }
    }, function (err, result) {
        if (err) { return next(err) }
        if (result.genre === null) {
            console.log(`can not find the genre `);
            let err = new Error('Genre not find')
            err.status = 404
            return next(err)
        }
        res.render('genre_detail', { title: 'Genre Detail', genre: result.genre, genre_informations: result.genre_informations })
    })
}

exports.genre_create_get = function (req, res, next) {
    res.render('genre_form', { title: 'Create Genre' })
}

exports.genre_create_post = [
    //Validate that the name field is not empty
    validator.body('name', 'Genre name required').isLength({ min: 1 }).trim(),

    //Sanitize(escape) the name field
    validator.sanitizeBody('name').escape(),

    //Process request after validation and sanitization
    (req, res, next) => {
        const errors = validator.validationResult(req)

        //Create a genre object with escaped and trimmed data
        let genre = new Genre({
            name: req.body.name
        })

        if (!errors.isEmpty()) {
            //There are errors. Render the form again with sanitized values/error messages
            res.render('genre_form', { title: 'Create Genre', genre: genre, errors: errors.array() })
            return
        }
        else {
            //Data from form is valid
            //Check if Genre with same name already exist
            Genre.findOne({
                'name': req.body.name
            }).exec(function (err, found_genre) {
                if (err) { return next(err) }

                if (found_genre) {
                    //Genre exist ,redirect to its detail page
                    res.redirect(found_genre.url)
                } else {
                    genre.save(function (err) {
                        if (err) { return next(err) }
                        //Genre saved. Redirect to genre detail page
                        res.redirect(genre.url)
                    })
                }

            })
        }
    }
]





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