const router = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/login', (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) return res.status(500).send(err);
    if (user) {
      const token = jwt.sign(user, process.env.JWT_SECRET);
      return res.json({ ...user, token });
    }
    return res.status(401).send(info);
  })(req, res);
});

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/createAccount', (req, res, next) => {
  req.session.role = req.query.role;
  // console.log(req.query.role);
  next();
}, passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const { user } = req;
    if (user.errMassage !== false) {
      return res.status(401).send(user);
    } if (user) {
      const userdata = {
        userid: user.userid,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
      };
      const token = jwt.sign(userdata, process.env.JWT_SECRET);

      return res.json({ ...userdata, token });
    }
    return res.status(422).json(user);
  });

module.exports = router;
