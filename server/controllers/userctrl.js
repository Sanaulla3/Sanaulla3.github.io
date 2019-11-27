
var Q = require('q');
var User = require('../models/usermodel');
const tweetCtrl = require('../controllers/tweetctrl');

var self = module.exports = {

signUp : function (userInfo, callback){
        var deferred = Q.defer();
        if (userInfo.name && userInfo.userHandle && userInfo.password) {            
                User.findOne({ userHandle : userInfo.userHandle }, function (err, obj){
                    if (err)
                        return deferred.reject('{ error:' + err + ' }');

                    if(obj){
                        deferred.reject("userHandle already registered");
                    }else{
                        User.create({
                            name : userInfo.name,
                            userHandle : userInfo.userHandle,
                            password : userInfo.password

                        }, function(err, user) {
                            if (err)
                                deferred.reject(err);
                            deferred.resolve(user);
                        });      
                    }
                    
                });        
            }
            else {
                deferred.reject("All fields are required");
            }

            deferred.promise.nodeify(callback);
            return deferred.promise;
    },

    logIn : function ( data, callback ){
        var deferred = Q.defer();
         if (data.userHandle && data.password) {
                 User.find({userHandle: data.userHandle},  function(err, user) {
                        if (err)
                            deferred.reject(err);
                        if(user.length > 0){
                            // if the user is found but the password is wrong
                            if (!(user[0].password == data.password))
                                return deferred.reject("wrong password");

                             deferred.resolve(user[0]);//'{"error":false, "status":"login success"}');
                        }else{
                            return deferred.reject("no user account with this credentials");
                        }
                    });      
            }
            else {
                deferred.reject("Both fields are required");
            }

        deferred.promise.nodeify(callback);
        return deferred.promise;
    },

    getUser :function (userHandle, callback){
        var deferred = Q.defer();
        if (userHandle) {            
            User.findOne({ userHandle : userHandle }, function (err, user){
                if (err)
                    return deferred.reject('{ error:' + err + ' }');
                deferred.resolve(user);
            });        
        } else {
            deferred.reject("User Handle is required");
        }
        deferred.promise.nodeify(callback);
        return deferred.promise;
    },

    doFollow : function (data, callback){
        var deferred = Q.defer();
        if (data.userId && data.followHandle) {            
                User.findByIdAndUpdate({ _id : data.userId }, { $push : { following : data.followHandle}}, function (err, obj){
                    if (err)
                        return deferred.reject('{ error:' + err + ' }');
                    User.findOne({ userHandle : data.followHandle }).populate('tweets').exec(function (err, user){
                        if (err)
                            return deferred.reject('{ error:' + err + ' }');
                        deferred.resolve(user.tweets);                                          
                    });                   
                });        
        } else {
            deferred.reject("Both fields are required");
        }
        deferred.promise.nodeify(callback);
        return deferred.promise;
    },

    doUnfollow : function (data, callback){
        var deferred = Q.defer();
        console.log("data", data);
        if (data.userId && data.followHandle) {            
            User.findByIdAndUpdate({ _id : data.userId }, { $pull : { following : data.followHandle}}, function (err, obj){
                if (err)
                    return deferred.reject('{ error:' + err + ' }');
                return deferred.resolve(obj);
            });        
        } else {
            deferred.reject("Both fields are required");
        }
        deferred.promise.nodeify(callback);
        return deferred.promise;
    }


};