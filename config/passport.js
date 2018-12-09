const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
// const keys = require('../config/keys');
const keys = require('./keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      // console.log(jwt_payload);
      User.findById(jwt_payload.id)
        .then(user => {
          if(user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};

/*
  This file allows us to do the following:

  - Extract the data from the JWT token.
  - Specify the use of a "Bearer" token.
  - Add the "secretOrKey" from our "keys.js" file.
  - Instruct Passport to pass in the user data as the "jwt_payload"
*/
