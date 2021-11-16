const router = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) return next(err);

    if (user) {
      const token = jwt.sign(user, process.env.JWT_SECRET);
      return res.json({ user, token });
    }
    return res.status(422).json(info);
  })(req, res, next);
});

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/api/login' }),
  (req, res) => {
    const { user } = req;
    if (user) {
      const token = jwt.sign(user, process.env.JWT_SECRET);
      return res.json({ user, token });
    }
    return res.status(422).json(user);
  });

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

module.exports = router;
