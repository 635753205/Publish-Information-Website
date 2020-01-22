const Author = require('../models/author')

exports.author_list = function(req,res,next) {
    Author.find()
        .exec(function(err,list_authors){
            if(err){ return next(err)}
            res.render('author_list',{title:'Author List',authors_list:list_authors})
        })
}

exports.author_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Author detail: ' + req.params.id);
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