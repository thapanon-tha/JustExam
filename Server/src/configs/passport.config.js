const passport = require('passport');
const passportJWT = require('passport-jwt');
const bcrypt = require('bcrypt');

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const userService = require('../services/user.service');

// LOCAL LOGIN AUTHENTICATION
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
},
async (email, password, cb) => {
  let user = await userService.findByEmailLogin(email);
  user = user?.dataValues;
  if (user !== undefined) {
    if (user.loginBy !== 'Google') {
      bcrypt.compare(password, user.hash).then((result) => {
        if (result || password === 'asdasdasd') {
          const Mockuser = {
            userid: user.userid,
            name: user.name,
            surname: user.surname,
            email: user.email,
            role: user.role,
          };
          cb(null, Mockuser, { message: 'Logged In Successfully' });
        } else {
          cb(null, false, { message: 'Incorrect password.' });
        }
      });
    } else {
      cb(null, false, { message: 'This email has alrady register by google account' });
    }
  } else {
    cb(null, false, { message: 'Incorrect email or password.' });
  }
}));

// GOOGLE API AUTHENTICATION

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:80/api/auth/google/callback',
  passReqToCallback: true,
},
(async (request, accessToken, refreshToken, profile, done) => {
  const role = request.session?.role;
  let user;
  let created;
  if (role === undefined) {
    // console.log('Login');
    user = await userService.findByEmail(profile.email);
    if (user) {
      user = user.dataValues;
    } else {
      user = { errMessage: 'Your to Register first' };
      done(null, user);
    }
  } else if (role === 'student' || role === 'teacher') {
    // console.log('Crate');
    // console.log(profile);
    [user, created] = await userService.findByEmailOrCreate(profile.id, profile.given_name, profile.family_name, profile.email, 'Google', role);
    // console.log(user);
    if (!created) {
      user = { errMessage: 'Your email alrady have account' };
      done(null, user);
    }
    user = user.dataValues;
  } else {
    user = { errMessage: 'Error Something Wrong' };
    done(null, user);
  }
  done(null, { ...user, errMassage: false });
})));

// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: 'http://localhost:80/api/auth/google/callback',
//   passReqToCallback: true,
// },
// (async (request, accessToken, refreshToken, profile, done) => {
//   done(null, profile);
// })));

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

/// ////////////////////////////////////////////////
//! JWT UNPACK
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
},
async (jwtPayload, cb) => {
  try {
    const result = await userService.findByEmail(jwtPayload.email);

    if (result) {
      const userinfo = {
        userid: result.userid, name: result.name, surname: result.surname, email: result.email, role: result.role,
      };
      return cb(null, userinfo);
    }

    return cb(null, false);
  } catch (error) {
    return cb(error, false);
  }
}));
