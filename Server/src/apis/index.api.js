const router = require('express').Router();

router.get('/login/google', (req, res) => {
  res.send('<a href="/api/auth/google">Authenticate with Google</a>');
});

router.use('/auth', require('../router/auth'));

module.exports = router;
