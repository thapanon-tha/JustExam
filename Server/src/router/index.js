const router = require('express').Router();

router.use('/', require('./apis'));
router.use('/auth', require('./auth'));

module.exports = router;
