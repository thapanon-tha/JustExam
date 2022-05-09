const router = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcrypt');
const userService = require('../services/user.service');

const cookieOption = {
  maxAge: new Date() * 0.001 + 300,
  domain: 'frontexam.azurewebsites.net',
  sameSite: 'None',
  secure: true,
  httpOnly: true,
};

router.post('/login', (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) return res.status(500).send(err);
    if (user) {
      const token = jwt.sign(user, process.env.JWT_SECRET);
      return res.status(200).json({
        token,
        ...user,
      });
    }
    res.status(400).json(info);
  })(req, res);
});

router.post('/register', async (req, res) => {
  const { data } = req.body;
  try {
    let user = await userService.findByEmailLogin(data.email);
    if (user) {
      return res.status(400).json({ message: 'this email has register' });
    }
    const hash = await bcrypt.hash(data.password, 10);

    //   // Store hash in your password DB.
    const result = await userService.findByEmailOrCreate({
      firstname: data.firstname,
      surname: data.surname,
      email: data.email,
      password: hash,
      provider: 'justexam',
      type: data.type,
    });
    user = result[0].dataValues;
    user = {
      uid: user.uid,
      firstname: user.firstname,
      surname: user.surname,
      email: user.email,
      type: user.type,
      provider: user.provider,
    };

    const token = jwt.sign(
      {
        uid: user.uid,
        firstname: user.firstname,
        surname: user.surname,
        email: user.email,
        type: user.type,
        provider: user.provider,
      },
      process.env.JWT_SECRET,
    );
    return res.status(200).json({
      token,
      uid: user.uid,
      firstname: user.firstname,
      surname: user.surname,
      email: user.email,
      type: user.type,
      provider: user.provider,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
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
        .redirect(`${process.env.FRONTURL}`);
    }
    if (user.errMassage === false) {
      const token = jwt.sign(user, process.env.JWT_SECRET);

      return res
        .cookie('token', token, cookieOption)
        .cookie('uid', user.uid, cookieOption)
        .cookie('firstname', user.firstname, cookieOption)
        .cookie('surname', user.surname, cookieOption)
        .cookie('email', user.email, cookieOption)
        .cookie('type', user.type, cookieOption)
        .redirect(process.env.FRONTURL);
    }
    return res.status(422).json(user);
  },
);

module.exports = router;
