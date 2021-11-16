const router = require('express').Router();

const mockuserdata = [{ username: 'jonh', password: '1234' }, { username: 'game', password: '1234' }, { username: 'new', password: '1234' }, { username: 'eye', password: '1234' }];

const login = (req, res) => {
  const user = mockuserdata.find((userData) => userData.username === req.body.username);
  console.log(user);
  if (user?.password === req.body.password) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
};

router.post('/login', login);

router.get('/login/google', (req, res) => {
  res.send('<a href="/api/auth/google">Authenticate with Google</a>');
});

router.use('/auth', require('../router/auth'));

module.exports = router;
