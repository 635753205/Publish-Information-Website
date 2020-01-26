const async = require('async')
const Author = require('../models/author')
const Information = require('../models/information')


exports.author_list = function(req,res,next) {
    Author.find()
        .exec(function(err,list_authors){
            if(err){ return next(err)}
            res.render('author_list',{title:'Author List',authors_list:list_authors})
        })
}

exports.author_detail = function(req, res,next) {
    async.parallel({
        author:function(callback){
            Author.findById(req.params.id)
            .exec(callback)
        },
        authors_information:function(callback){
            Information.find({'author':req.params.id},'title contents')
            .exec(callback)
        }
    },function(err,result){
        if(err){ return next(err) }
        if(result.author === null){
            let err = new Error('Author not found')
            err.status = 404
            return next(err)
        }
        res.render('author_detail',{title:'Author detail',author:result.author,authors_information:result.authors_information})
    })
    
};

exports.author_create_get = function(req,res){
    res.send('Noy implemented:Author create')
}

exports.author_create_post = function(req,res){
    res.send('Not implemented:Author create post')
}

exports.author_delete_get = function(req,res){
    res.send('Not implemented:Author delete get')
}

exports.author_delete_post = function(req,res){
    res.send('NOT IMPLEMENTED:AUTHOR delete post')
}

exports.author_update_get = function(req,res){
    res.send('NOT IMPLEMENTED:AUTHOR UPDATE GET')
}

exports.author_update_post = function(req,res){
    res.send('NOT IMPLEMNETED:AUTHOR UPDATE POST')
}