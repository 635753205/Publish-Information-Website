#! /usr/bin/env node
console.log('This script will populate the data to the server');
// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
const Info = require('./models/information') 
const Author = require('./models/author')
const Genre = require('./models/genre')
const InfoInstance = require('./models/infoInstance')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var authors = []
var genres = []
var informations = []
var infoInstances = []

function authorCreate(first_name, last_name, cb) {
  authorDetail = { first_name: first_name, last_name: last_name }

  let author = new Author(authorDetail)

  author.save((err) => {
    if (err) {
      cb(err, null)
      return
    }
    console.log(`New Author:${author}`);
    authors.push(author)
    cb(null, author)
  })
}

function genreCreate(name, cb) {
  let genre = new Genre({ name: name })

  genre.save((err) => {
    if (err) {
      cb(err, null)
      return
    }
    console.log(`New Genre:${genre}`);
    genres.push(genre)
    cb(null, genre)
  })
}

function infoCreate(title, author, contents, cb) {
  infoDetail = {
    title: title,
    author: author,
    contents: contents
  }

  let info = new Info(infoDetail)
  info.save((err) => {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Info:' + info)
    informations.push(info)
    cb(null, info)
  })
}

function infoInstanceCreate(info, imprint, cb) {
  infoInstanceDetail = {
    info: info,
    imprint: imprint
  }

  let infoInstance = new InfoInstance(infoInstanceDetail)
  infoInstance.save(function (err) {
    if (err) {
      console.log('New infoInstance:' + infoInstance)
      cb(err, null)
      return
    }
    console.log(`New InfoInstance: ${infoInstance}`)
    infoInstances.push(infoInstance)
    cb(null, info)
  })
}


function createAuthors(cb) {
  async.series([
    function (callback) {
      authorCreate('yuqing', 'han', callback)
    }
  ], cb)
}

function createGenres(cb) {
  async.series([
    function (callback) {
      genreCreate('公告', callback)
    }
  ], cb)
}

function createInformation(cb) {
  async.parallel([
    function (callback) {
      infoCreate('安徽师范大学皖江学院2019-2020学年第二学期时间安排', authors[0], '1.开学时间：2020年2月15日报到注册，2月17日正式上课。2.上课时间：2020年2月17日至2020年6月14日（共17周）。3.节假日：清明节、端午节各放假1天，劳动节放假3天。4.暑假:2020年6月29日开始。', callback)
    }
  ], cb)
}

function createInfoInstance(cb) {
  async.parallel([
    function (callback) {
      infoInstanceCreate(informations[0], '2020/1/18', callback)
    }
  ], cb)
}


async.series([
  createAuthors,
  createGenres,
  createInformation,
  createInfoInstance
],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    }
    else {
      console.log('infoInstances ' + infoInstances);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  });



