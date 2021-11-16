const router = require('express').Router();

router.get('/login/google', (req, res) => {
  res.send(`<a href="/api/auth/google">Authenticate with Google</a> <br> 
  <a href="/api/auth/google/createAccount?role=student">create  with Google to be student</a> <br>
  <a href="/api/auth/google/createAccount?role=teacher">create  with Google to be teacher</a>`);
});

router.use('/auth', require('../router/auth'));
router.use('/user', require('../router/user'));

module.exports = router;
