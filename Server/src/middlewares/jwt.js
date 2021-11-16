const passport = require('passport');
require('../configs/passport.config');

const jwtChecker = passport.authenticate('jwt', { session: false });

module.exports = jwtChecker;
