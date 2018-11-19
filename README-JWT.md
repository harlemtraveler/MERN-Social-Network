# JSON Web Tokens

## The Outline of How JSON Web Tokens are Implemented.

[+] Install the NPM library package for Node.js:

```
  npm install jsonwebtoken
```

[+] Import the library into a file and store it in a variable:

```
  const jwt = require('jsonwebtoken');
```

[+] Integrate JWT into the Auth process:

```
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
                    token: 'Bear ' + token
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

```

[+] Enable ability to check current user (optional):

```
  // @routes GET api/users/current
  // @desc   Return current user
  // @access Private
  router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
      msg: '[+] Success ✅ '
    });
  });

```

[+] Import the **passport** library package into _server.js_:

```
  const passport = require('passport');
```

[+] Create and use middleware to handle the JWT payload created in steps prior:

```
  // Passport middleware
  app.use(passport.initialize());

  // Passport Config
  require('./config/passport')(passport);

```

[+] Create a separate file called _passport.js_ to create and implement a _JwtStrategey_, which'll make use of the _jwt_payload_ we created:

```
  const JwtStrategy = require('passport-jwt').Strategy;
  const ExtractJwt = require('passport-jwt').ExtractJwt;
  const mongoose = require('mongoose');
  const User = mongoose.model('users');
  const keys = require('../config/keys');
  // const keys = require('./keys');

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

```

[+] Create a secure _Protected Route_ for authenticated users within the _users.js_ file:

```
  // @routes GET api/users/current
  // @desc   Return current user
  // @access Private
  router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
      msg: '[+] Success ✅ '
    });
  });
```
