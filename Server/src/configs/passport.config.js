const passport = require('passport');
const passportJWT = require('passport-jwt');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
// const AzureAdOAuth2Strategy = require('passport-azure-ad-oauth2').Strategy;
const userService = require('../services/user.service');

// LOCAL LOGIN AUTHENTICATION
const local = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, cb) => {
    try {
      let user = await userService.findByEmailLogin(email);
      user = user?.dataValues;
      if (user !== undefined) {
        if (user.provider !== 'Google') {
          const result = await bcrypt.compare(password, user?.hash);
          if (result) {
            const Mockuser = {
              uid: user.uid,
              firstname: user.firstname,
              surname: user.surname,
              email: user.email,
              type: user.type,
              provider: 'justexam',
            };
            cb(null, Mockuser, { message: 'Logged In Successfull' });
          } else {
            cb(null, false, { message: 'Incorrect password.' });
          }
        } else {
          cb(null, false, {
            message: 'This email has alrady register by google account',
          });
        }
      } else {
        cb(null, false, { message: 'Incorrect email' });
      }
    } catch (error) {
      cb(null, false, { message: 'Error something worng' });
    }
  },
);

// const azure = new AzureAdOAuth2Strategy(
//   {
//     clientID: process.env.OUTLOOK_CLIENT_ID,
//     clientSecret: process.env.OUTLOOK_CLIENT_SECRET,
//     callbackURL: '/api/auth/azure/callback',
//   },
//   (accessToken, refresh_token, params, profile, done) => {
//     const waadProfile = jwt.decode(params.id_token);
//     done(null, waadProfile);
//   },
// );

const google = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback',
    passReqToCallback: true,
  },
  async (request, accessToken, refreshToken, profile, done) => {
    const role = request.session?.role;
    let user;
    let created;
    if (role === undefined) {
      user = await userService.findByEmail(profile.email);
      if (user) {
        user = user.dataValues;
      } else {
        user = { errMessage: true };
        done(null, user);
      }
    } else if (role === 'student' || role === 'teacher') {
      const userPack = {
        uid: profile.userid,
        firstname: profile.given_name,
        surname: profile.family_name,
        email: profile.email,
        type: role,
        provider: 'google',
      };
      [user, created] = await userService.findByEmailOrCreate(userPack);
      if (!created) {
        user = { errMessage: true };
        done(null, user);
      }
      user = user.dataValues;
    } else {
      user = { errMessage: true };
      done(null, user);
    }
    done(null, { ...user, errMassage: false });
  },
);

const JWT = new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  async (jwtPayload, cb) => {
    try {
      const result = await userService.findByEmail(jwtPayload.email);
      if (result) {
        const userinfo = {
          uid: result.uid,
          name: result.firstname,
          surname: result.surname,
          email: result.email,
          type: result.type,
        };
        return cb(null, userinfo);
      }

      return cb(null, false);
    } catch (error) {
      return cb(error, false);
    }
  },
);

// GOOGLE API AUTHENTICATION
passport.use(local);
passport.use(google);
// passport.use(azure);
passport.use(JWT);
