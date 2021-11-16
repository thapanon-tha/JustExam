const router = require('express').Router();
const jwtChecker = require('../middlewares/jwt');
const userController = require('../controllers/user.controller');

router.get('/', jwtChecker, userController.getByUserId);

module.exports = router;
