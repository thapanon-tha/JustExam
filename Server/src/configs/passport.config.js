const passport = require('passport');
const passportJWT = require('passport-jwt');

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const LocalStrategy = require('passport-local').Strategy;

// Mock Data
const Mockuser = {
  id: 1,
  sub: 'nottdev',
  email: 'nottdev@gmail.com',
};

// LOCAL LOGIN AUTHENTICATION
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
},
(email, password, cb) => {
  // this one is typically a DB call.
  if (email !== Mockuser.email) { return cb(null, false, { message: 'Incorrect email or password.' }); }

  return cb(null, Mockuser, { message: 'Logged In Successfully' });
}));

// GOOGLE API AUTHENTICATION
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:80/api/auth/google/callback',
  passReqToCallback: true,
},
((request, accessToken, refreshToken, profile, done) => {
  const user = {
    id: 3,
    name: profile.given_name,
    surname: profile.family_name,
    email: profile.email,
    loginBy: profile.provider,
  };
  done(null, user);
})));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

/// ////////////////////////////////////////////////
//! JWT UNPACK
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
},
(jwtPayload, cb) => {
  try {
    // find the user in db if needed
    if (jwtPayload.id === Mockuser.id) {
      return cb(null, jwtPayload);
    }
    return cb(null, false);
  } catch (error) {
    return cb(error, false);
  }
}));
