const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userctrl');
const tweetCtrl = require('../controllers/tweetctrl');

/**
 * API END POINTS BEGIN
 */

module.exports = function(app) {
    // =====================================
    // LOGIN ===============================
    // =====================================

      app.post('/signup', function(req, res){
        userCtrl.signUp(req.body).then(function(data){
          return res.status(200).json({status: 'Success!!! ', user: data});
        }, function(err){
          return res.status(401).json({error: true, message: err} );
        })
         
      })

      app.post('/login', function(req, res){
        userCtrl.logIn(req.body).then(function(data){
          return res.status(200).json({status: 'Success!!! ', user: data});
        }, function(err){
          return res.status(401).json({error: true, status: err} );
        })         
      })

      app.get('/logout', function(req, res){
        req.session.destroy(function(err) {
            if(err)
              return next(err);
          return res.status(200).json({message: "logout success", status: req.session} );
        });         
      })

      app.post('/tweet', function(req, res){
        tweetCtrl.postTweet(req.body).then(function(data){
          return res.status(200).json({status: 'Success!!! ', data: data});
        }, function(err){
          return res.status(401).json({error: true, status: err} );
        })
         
      })

      app.get('/tweets/:id', function(req, res){
        tweetCtrl.getTweets(req.params.id).then(function(data){
          return res.status(200).json({status: 'Success!!! ', data: data});
        }, function(err){
          return res.status(401).json({error: true, status: err} );
        })
         
      })

      app.get('/user/:handle', function(req, res){
        userCtrl.getUser(req.params.handle).then(function(data){
          return res.status(200).json({status: 'Success!!! ', data: data});
        }, function(err){
          return res.status(401).json({error: true, status: err} );
        })         
      })

      app.put('/follow', function(req, res){
        userCtrl.doFollow(req.body).then(function(data){
          return res.status(200).json({status: 'Success!!! ', data: data});
        }, function(err){
          return res.status(401).json({error: true, status: err} );
        })         
      })

      app.put('/unfollow', function(req, res){
        console.log(req.body);
        userCtrl.doUnfollow(req.body).then(function(data){;
          return res.status(200).json({status: 'Success!!! ', data: data});
        }, function(err){
          return res.status(401).json({error: true, status: err} );
        })         
      })

      return router;
};