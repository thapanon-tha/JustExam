const router = require('express').Router({ mergeParams: true });
const controller = require('../../controllers/User.controller');

router.post('/login', controller.getTaskMenu);

router.post('/register', controller.update);

// self
router.put('/', controller.update);

module.exports = router;
