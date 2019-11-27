
var Q = require('q');
var mongoose = require('mongoose');
var User = require('../models/usermodel');
var Tweets = require('../models/tweetsModel');

var self = module.exports = {

postTweet : function (tweet, callback){
        var deferred = Q.defer();
        if (tweet.userId) {
            var newTweet = {
                name: tweet.name,
                handle: tweet.userHandle,
                createdOn: Date.now(),
                tweet : tweet.message,
                _creator : tweet.userId
            }
            Tweets.create( newTweet, function(err, res) {
                if (err)
                    deferred.reject(err);       
                User.findByIdAndUpdate({ _id : tweet.userId }, { $push : { tweets : res._id}},function (err, user){
                    if (err)
                        return deferred.reject('{ error:' + err + ' }');
                    deferred.resolve(res);                                          
                });
            });        
        } else {
            deferred.reject("Both fields are required");
        }
        deferred.promise.nodeify(callback);
        return deferred.promise;
    },

    getTweets : function (userId, callback){
        var deferred = Q.defer();
        if (userId) {                   
            User.findById({ _id : mongoose.Types.ObjectId(userId) }).populate('tweets').exec(function (err, user){
                if (err)
                    return deferred.reject('{ error:' + err + ' }');
                if(user.following.length > 0){
                    for(let i = 0; i < user.following.length; i++){
                        User.find({ userHandle : user.following[i] }).populate('tweets').exec(function (err, following){
                            if (err)
                                return deferred.reject('{ error:' + err + ' }');
                            if(following.length > 0)
                                user.tweets = user.tweets.concat(following[0].tweets);
                            if(i == (user.following.length - 1))
                                deferred.resolve(user);
                        });
                    }
                } else {
                    deferred.resolve(user);
                }                                          
            });                    
        } else {
            deferred.reject("no user id found");
        }
        deferred.promise.nodeify(callback);
        return deferred.promise;
    }

};