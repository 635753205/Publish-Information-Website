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

function infoCreate(title, author, contents, genre,cb) {
  infoDetail = {
    title: title,
    author: author,
    genre:genre,
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
    },
    function(callback){
      authorCreate('悟能', '朱', callback)
    },
    function(callback){
      authorCreate('八戒', '猪', callback)
    },
    function(callback){
      authorCreate('悟能', '朱', callback)
    },
    function(callback){
      authorCreate('元帅', '天蓬', callback)
    },
    function(callback){
      authorCreate('皮龟', '憨', callback)
    },
    function(callback){
      authorCreate('碧落', '乔', callback)
    },
    function(callback){
      authorCreate('亦凡', '吴', callback)
    },
    function(callback){
      authorCreate('徐坤', '菜', callback)
    },
    function(callback){
      authorCreate('瑗', '王', callback)
    },

    function(callback){
      authorCreate('寒', '撸', callback)
    }

  ], cb)
}

function createGenres(cb) {
  async.series([
    function (callback) {
      genreCreate('公告', callback)
    },

    function(callback){
      genreCreate('通知', callback)
    },
    function(callback){
      genreCreate('失物招领', callback)
    },
    function(callback){
      genreCreate('寻物启事', callback)
    },

  ], cb)
}

function createInformation(cb) {
  async.parallel([
    function (callback) {
      infoCreate('安徽师范大学皖江学院2019-2020学年第二学期时间安排', authors[0], '1.开学时间：2020年2月15日报到注册，2月17日正式上课。2.上课时间：2020年2月17日至2020年6月14日（共17周）。3.节假日：清明节、端午节各放假1天，劳动节放假3天。4.暑假:2020年6月29日开始。', genres[0], callback)
    },

    function(callback){
      infoCreate('安徽师范大学皖江学院爱心协会活动通知', authors[1], '通知：爱心协会将于本周六举办爱心捐赠衣服活动，请各位同学积极参加！', genres[0], callback)
    },
    function(callback){
      infoCreate('失物招领',authors[2],'有哪位同学于今天上午遗失了一张银行卡，请失主联系“189XXXXXXXX”！',  genres[2],callback)
    },
    function(callback){
      infoCreate('失物招领',authors[3],'有哪位同学于昨天中午在食堂遗失了一张校园卡，请失主联系“189XXXXXXXX”！',  genres[2],callback)
    },
    function(callback){
      infoCreate('失物招领',authors[4],'有哪位同学于今天下午在操场丢失一件外套，请失主联系“189XXXXXXXX”！',  genres[2],callback)
    },
    function(callback){
      infoCreate('失物招领',authors[5],'有哪位同学于今天上午在图书馆丢失了一本高数书，请失主联系“189XXXXXXXX”！',  genres[2],callback)
    },
    function(callback){
      infoCreate('寻物启事',authors[6],'本人不慎在图书馆丢失一本高数书，有拾到者请与XX先生联系，必有酬谢！',  genres[3],callback)
    },
    function(callback){
      infoCreate('寻物启事',authors[7],'本人不慎在食堂丢失一张校园卡，有拾到者请与XX先生联系，必有酬谢！', genres[3],callback)
    },
    function(callback){
      infoCreate('寻物启事',authors[8],'本人不慎丢失一张银行卡，有拾到者请与XX先生联系，必有酬谢',genres[3],callback)
    },
    function(callback){
      infoCreate('安徽师范大学皖江学院文学社活动通知',authors[9],'通知：皖江学院文学社将于2020年1月15日下午2点在报告厅举办书法大赛，请各位同学积极参加！', genres[1],callback)
    },
    function(callback){
      infoCreate('安徽师范大学皖江学院新闻社活动通知',authors[10],'通知：皖江学院文学社将于2020年1月20日下午2点在报告厅举办“我是小记者”活动，请各位同学积极参加！', genres[1],callback)
    },
  ], cb)
}

function createInfoInstance(cb) {
  async.parallel([
    function (callback) {
      infoInstanceCreate(informations[0], '2020/1/18', callback)
    },
    function(callback){
      infoInstanceCreate(informations[1], '2020/1/19', callback)
    },
    function(callback){
      infoInstanceCreate(informations[2], '2020/1/13', callback)
    },
    function(callback){
      infoInstanceCreate(informations[3], '2020/1/12', callback)
    },
    function(callback){
      infoInstanceCreate(informations[4], '2020/1/11', callback)
    },
    function(callback){
      infoInstanceCreate(informations[5], '2020/1/10', callback)
    },
    function(callback){
      infoInstanceCreate(informations[6], '2020/1/12', callback)
    },
    function(callback){
      infoInstanceCreate(informations[7], '2020/1/9', callback)
    },
    function(callback){
      infoInstanceCreate(informations[8], '2020/1/11', callback)
    },
    function(callback){
      infoInstanceCreate(informations[9], '2020/1/15', callback)
    },
    function(callback){
      infoInstanceCreate(informations[10], '2020/1/19', callback)
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



