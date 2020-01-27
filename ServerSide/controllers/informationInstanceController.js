const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const async = require('async')
const InformationInstance = require('../models/infoInstance')
const Information = require('../models/information')

exports.infoInstance_list = function (req, res, next) {
    InformationInstance.find()
        .populate('information')
        .exec(function (err, list_information_instance) {
            if (err) { return next(err) }
            res.render('infoInstance_list', { title: 'Information Instance List', information_instance_list: list_information_instance })
        })
}

exports.infoInstance_detail = function (req, res, next) {
    InformationInstance.findById(req.params.id)
        .populate('information')
        .exec(function (err, information_instance) {
            if (err) { return next(err) }
            if (information_instance === null) {
                let err = new Error('Can not find the information instance')
                err.status = 404
                return next(err)
            }
            res.render('information_instance_detail', { title: `Information:${information_instance.title}`, instance_information: information_instance })
        })
}

exports.infoInstance_create_get = function (req, res, next) {
    Information.find({}, 'title')
        .exec(function (err, informations) {
            if (err) { return next(err) }
            res.render('information_instance_form', { title: 'Create Infromation Instance', information_list: informations })
        })
}

exports.infoInstance_create_post = [
    body('information', 'Information must be specified').isLength({ min: 1 }).trim(),
    body('imprint', 'Imprint must be specified').isLength({ min: 1 }).trim(),

    sanitizeBody('information').escape(),
    sanitizeBody('imprint').escape(),

    (req,res,next) => {
        //Extract the validation and sanitization
        const errors = validationResult(req)

        let informationinstance = new InformationInstance({
            information:req.body.information,
            imprint:req.body.imprint
        })

        if(!errors.isEmpty()){
            Information.find({},'title')
            .exec(function(err,informations){
                if(err){return next(err)}
                res.render('information_instance_form',
                {
                    title:'Create Information Instance',
                    information_list:informations,
                    errors:errors.array(),
                    informationinstance:informationinstance
                })
                return
            })
        }
        else{
            informationinstance.save(function (err) {
                if(err){ return next(err)}
                res.redirect(informationinstance.url)
            })
        }

    }

]

exports.infoInstance_delete_get = function (req, res) {
    res.send('NOT IMPLEMENTED:INFOINSTANCE DELETE GET')
}

exports.infoInstance_delete_post = function (req, res) {
    res.send('NOT IMPLMENTED:INFOINSTANCE DELETE GET')
}

exports.infoInstance_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED:INFOINSTANCE DELETE GET')
}

exports.infoInstance_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED:INFOINSTANCE UPDATE POST')
}