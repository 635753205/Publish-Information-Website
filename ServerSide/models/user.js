//schemas/user.js

var mongoose = require('mongoose');

var bcrypt = require('bcrypt');

var SALT_WORK_FSCTOR = 10; // 计算强度,越大破解越困难

var UserSchema = new mongoose.Schema({

 name: {

 unique: true,

 type:String

 },

 password: String,

 email:String,

 meta: {

 createAt: {

  type: Date,

  default: Date.now()

 },

 updateAt: {

  type: Date,

  default: Date.now()

 }

 }

});

//每次存入数据时都进行判断

UserSchema.pre('save', function (next) {

 var user = this;

 if (this.isNew) { // 数据是新数据

 this.meta.createAt = this.meta.updateAt = Date.now();

 } else {

 this.meta.updateAt = Date.now();

 }

 //密码 加盐

 bcrypt.genSalt(SALT_WORK_FSCTOR, function (err, salt) {

 if (err) {

  return next(err);

 }

 bcrypt.hash(user.password, salt, function (err, hash) {

  if (err) {

  return next(err);

  }

  user.password = hash;

  next();

 });

 });

});

UserSchema.methods = {

 comparePassword: function (_password, cb) {

 bcrypt.compare(_password, this.password, function (err, isMatch) {

  if (err) {

  return cb(err);

  }

  cb(null, isMatch);

 })

 }

};

UserSchema.statics = {

 fetch: function (cb) {

 return this

  .find({})

  .sort('meta.updateAt')

  .exec(cb);

 },

 findById: function (id, cb) {

 return this

  .findOne({_id: id})

  .exec(cb)

 }

};

module.exports = mongoose.model('user',UserSchema)
