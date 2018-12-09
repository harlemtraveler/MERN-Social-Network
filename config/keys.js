// if (process.env.NODE_ENV === 'production') {
//   module.exports = require('./keys_prod');
// } else {
//   module.exports = require('./keys_dev');
// }

module.exports = {
  // mongoURI: 'mongodb://tim:password1@ds161446.mlab.com:61446/merndb-devopsec',
  // mongoURI: 'mongodb://tim:password1@ds121262.mlab.com:21262/mern-book',
  mongoURI: 'mongodb://tim:password1@localhost:27017/merndb',
  secretOrKey: 'supersecret'
};
