const router = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/login', (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) return res.status(500).send(err);
    if (user) {
      const token = jwt.sign(user, process.env.JWT_SECRET);
      res
        .cookie('token', token, {
          maxAge: new Date() * 0.001 + 300,
          domain: process.env.FRONTHOST,
          secure: true,
          sameSite: 'none',
        })
        .cookie('uid', user.uid, {
          maxAge: new Date() * 0.001 + 300,
          domain: process.env.FRONTHOST,
          secure: true,
          sameSite: 'none',
        })
        .cookie('firstname', user.firstname, {
          maxAge: new Date() * 0.001 + 300,
          domain: process.env.FRONTHOST,
          secure: true,
          sameSite: 'none',
        })
        .cookie('surname', user.surname, {
          maxAge: new Date() * 0.001 + 300,
          domain: process.env.FRONTHOST,
          secure: true,
          sameSite: 'none',
        })
        .cookie('email', user.email, {
          maxAge: new Date() * 0.001 + 300,
          domain: process.env.FRONTHOST,
          secure: true,
          sameSite: 'none',
        })
        .cookie('type', user.type, {
          maxAge: new Date() * 0.001 + 300,
          domain: process.env.FRONTHOST,
          secure: true,
          sameSite: 'none',
        })
        .redirect(`http://${process.env.FRONTHOST}:${process.env.FRONTPORT}/`);
    }
    return res.status(401).send(info);
  })(req, res);
});

router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }),
);

router.get(
  '/google/createAccount',
  (req, res, next) => {
    req.session.role = req.query.role;
    next();
  },
  passport.authenticate('google', { scope: ['email', 'profile'] }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const { user } = req;
    if (user.errMassage !== false && user?.uid === undefined) {
      return res
        .clearCookie('connect.sid')
        .status(401)
        .redirect(`http://${process.env.FRONTHOST}:${process.env.FRONTPORT}/`);
    }
    if (user.errMassage === false) {
      const token = jwt.sign(user, process.env.JWT_SECRET);

      return res
        .cookie('token', token, {
          maxAge: new Date() * 0.001 + 300,
          domain: process.env.FRONTHOST,
          secure: true,
          sameSite: 'none',
        })
        .cookie('uid', user.uid, {
          maxAge: new Date() * 0.001 + 300,
          domain: process.env.FRONTHOST,
          secure: true,
          sameSite: 'none',
        })
        .cookie('firstname', user.firstname, {
          maxAge: new Date() * 0.001 + 300,
          domain: process.env.FRONTHOST,
          secure: true,
          sameSite: 'none',
        })
        .cookie('surname', user.surname, {
          maxAge: new Date() * 0.001 + 300,
          domain: process.env.FRONTHOST,
          secure: true,
          sameSite: 'none',
        })
        .cookie('email', user.email, {
          maxAge: new Date() * 0.001 + 300,
          domain: process.env.FRONTHOST,
          secure: true,
          sameSite: 'none',
        })
        .cookie('type', user.type, {
          maxAge: new Date() * 0.001 + 300,
          domain: process.env.FRONTHOST,
          secure: true,
          sameSite: 'none',
        })
        .redirect(`http://${process.env.FRONTHOST}:${process.env.FRONTPORT}/`);
    }
    return res.status(422).json(user);
  },
);

router.get('/azure', passport.authenticate('azure_ad_oauth2'));

router.get(
  '/azure/callback',
  passport.authenticate('azure_ad_oauth2', { session: false }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.status(200).send('OKKKKKKK');
  },
);

module.exports = router;
