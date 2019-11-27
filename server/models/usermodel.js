var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userInfo = mongoose.Schema({
    name    : String,
    userHandle  : String,
    password    : String,
    tweets : [{ type: Schema.Types.ObjectId, ref: 'Tweets'}],
    following : []
});

var User = mongoose.model('User', userInfo);
module.exports = User;