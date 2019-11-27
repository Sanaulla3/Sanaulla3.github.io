var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tweetInfo = mongoose.Schema({
    name: String,
    handle: String,
    createdOn : Number,
    tweet    : String,
    _creator    : { type: Schema.Types.ObjectId, ref: 'User' }
});

var Tweets = mongoose.model('Tweets', tweetInfo);
module.exports = Tweets;