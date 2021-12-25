const router = require('express').Router({ mergeParams: true });
const controller = require('../../controllers/User.controller');

router.post('/login', controller.userLogin);

router.post('/register', controller.userRegister);

// self
router.put('/', controller.update);

module.exports = router;
