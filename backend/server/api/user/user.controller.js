'use strict';

var User = require('./user.model');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');



var validationError = function(res, err) {
  return res.status(422).json(err);
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  const user = new User(req.body);
  user.save(function(err,response) {
    if(err) {
      if (err && err.code === 11000) {
        res.status(500).json({message: 'The specified User is already Exist with us !!!'})
       } else {
         res.status(500).send({message:'Something Went Wrong !!!'});
       }  
    } else {
      var token = jwt.sign({_id: response._id }, config.secrets.session, { expiresInMinutes: 60*5 });
      res.status(200).json({ token: token ,userrole: response.role,firstname:response.firstname});
    }
  });
  };

  exports.userDelete = function (req, res, next){
    User.findByIdAndDelete(req.params.userId, function(err, response) {
     if(err) { return res.status(500).send({message:'Something Went Wrong !!!'});}
     return res.status(200).send({message: 'Deleted Successfully !!!'});
    })
  }

  exports.getAllUsers = function(req, res) {
    User.find({status:true}).skip(req.body.start).limit(parseInt(req.body.end) - parseInt(req.body.start)).sort({ "created_at": -1 }).populate('createdBy',{ firstName:1 ,_id:0}).exec(function (err, users) {
      if (err) {return res.status(400).json({message:'Something Went Wrong !!!'})} 
      return res.status(200).json(users)
    });
  };

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};


