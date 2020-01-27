const async = require('async')
const Author = require('../models/author')
const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')
const Information = require('../models/information')


exports.author_list = function (req, res, next) {
    Author.find()
        .exec(function (err, list_authors) {
            if (err) { return next(err) }
            res.render('author_list', { title: 'Author List', authors_list: list_authors })
        })
}

exports.author_detail = function (req, res, next) {
    async.parallel({
        author: function (callback) {
            Author.findById(req.params.id)
                .exec(callback)
        },
        authors_information: function (callback) {
            Information.find({ 'author': req.params.id }, 'title contents')
                .exec(callback)
        }
    }, function (err, result) {
        if (err) { return next(err) }
        if (result.author === null) {
            let err = new Error('Author not found')
            err.status = 404
            return next(err)
        }
        res.render('author_detail', { title: 'Author detail', author: result.author, authors_information: result.authors_information })
    })

};

exports.author_create_get = function (req, res) {
    res.render('author_form', { title: 'Create Author' })
}

exports.author_create_post = [
    body('first_name').isLength({ min: 1 }).trim().withMessage('Frist name must be specified'),
    body('last_name').isLength({ min: 1 }).trim().withMessage('Last name must be specified'),

    //Sanitize fields
    sanitizeBody('first_name').escape(),
    sanitizeBody('last_name').escape(),

    (req, res, next) => {
        //Extract the validation errors from the request
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            //There are errors,Render form again with sanitized values/errors messages
            res.render('author_form', { title: 'Create Author', author: req.body, errors: errors.array() })
            return
        }
        else {
            //Data from form is valid

            //Create an Author object with escaped and trimmed data
            let author = new Author({
                first_name: req.body.first_name,
                last_name: req.body.last_name
            })

            //Data from form is valid
            //Check if Author with same name already exist
            Author.findOne({
                "first_name": req.body.first_name,
                "last_name": req.body.last_name
            }).exec(function (err, found_author) {
                if (err) { return next(err) }

                //Author exist ,redirect to its detail page
                if (found_author) {
                    res.redirect(found_author.url)
                } else {
                    //Author saved. Redirect to genre detail page
                    author.save(function (err) {
                        if (err) { return next(err) }
                        res.redirect(author.url)
                    })
                }


            })
        }
    }
]

exports.author_delete_get = function (req, res) {
    res.send('Not implemented:Author delete get')
}

exports.author_delete_post = function (req, res) {
    res.send('NOT IMPLEMENTED:AUTHOR delete post')
}

exports.author_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED:AUTHOR UPDATE GET')
}

exports.author_update_post = function (req, res) {
    res.send('NOT IMPLEMNETED:AUTHOR UPDATE POST')
}