const bcrypt = require("bcryptjs");
const authModel = require('../model/auth');
const jwt = require('jsonwebtoken');


exports.signUp = (req, res, next) => { // on attempt to sign up
  findUser(req.body.email, function (err, result) {
    if (err){
      return res.status(409).json({
        message: err
      });
    }

    bcrypt.hash(req.body.password, 10).then(hash => { // hash the password and save it
      const newUser = authModel({
        email: req.body.email,
        password: hash
      });
      newUser.save().then(data => {
        const token = jwt.sign({email: req.body.email, userId: newUser._id}, process.env.JWT_KEY, {expiresIn: '1h'}); // create and send a token that lasts for 1 hour
        res.status(200).json({
          email: req.body.email,
          userId: newUser._id,
          expirationTime: new Date().getTime()  + 3600000,  // token expire date in milliseconds
          token
        });
      }).catch(() => {
        res.status(500).json({
          message: 'server error, please try again later'
        });
      });
    });
  });
};

function findUser(email, callback) {
  authModel.findOne({email: email}).then(data =>{
    if (data){
      callback('Email address already signed up!', null);
    } else {
      callback(null, 'doesnt exist');
    }
  });
}


exports.login = (req, res, next) => { // on attempt to login
  let fetchedUser;
  let userStatus = true;  // hold whether the user exists
  authModel.findOne({email: req.body.email}).then(user => {
    fetchedUser = user;
    if(!user){
      userStatus= false;  // if user doesnt exist
    }

    return bcrypt.compareSync(req.body.password, fetchedUser.password); // compare hashes with one another
  }).then(data => {
    if(!data) {
      return res.status(401).json({  // if incorrect login credentials are wrong
        message: 'Invalid login credentials'
      });
    }

    const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id}, process.env.JWT_KEY, {expiresIn: '1h'});  //return a token that lasts for 1 hour
    res.status(200).json({
      email: fetchedUser.email,
      userId: fetchedUser._id,
      expirationTime: new Date().getTime() + 3600000, // time left is 1 hour
      token
    });

  }).catch(err =>{
    if(!userStatus) {
      return res.status(409).json({  // email doesnt exist
        message: 'Invalid login credentials'
      });
    }else {
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
  });
};
