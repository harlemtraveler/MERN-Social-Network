const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');

// Load User model
const User = require('../../models/User');

// @routes GET api/users/test
// @desc   Tests users route
// @access Public
router.get('/test', (req, res) => res.json({
  msg: 'Users Works'
}));

// @routes GET api/users/register
// @desc   Register users route
// @access Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if(!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({email: req.body.email}).then(user => {
    if(user) {
      return res.status(400).json({email: '[!] Email already exist'})
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'r', // Rating
        d: 'mm' // Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @routes GET api/users/login
// @desc   Login users / Returning JWT token
// @access Public
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({email})
    .then(user => {
      // Check for user
      if(!user) {
        return res.status(404).json({
          email: '[!] User not found ⚠️ '
        });
      }

      // Check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(isMatch) {
            // User matched -> Create JWT payload
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar
            }

            // Sign Token
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 }, // 3600sec -> 1hr
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              }
            );

          } else {
            return res.status(400).json({
              password: '[-] Password Incorrect ❌ '
            });
          }
        })
    });
});

// @routes GET api/users/current
// @desc   Return current user
// @access Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
});

module.exports = router;

/*
  What's happening in the program above?:

  - We send in our form (via Postman for demo purposes).
  - Retrieve all data from the request body.
  - Pass in the email that was submitted through Gravatar (checks for matching avatar).
  - Assign the gravatar as the user's avatar (else assign a sample avatar)
  - Create a new user with all specified fields.
  - Generate a Salt with bcryptjs.
  - Hash the password with the new Salt.
  - Set the password to the new hashed password.
  - Save the user.
  - Respond with the newly created user.
*/
