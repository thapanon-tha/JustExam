const router = require('express').Router();
const jwtChecker = require('../middlewares/jwt');
const examController = require('../controllers/exam.controller');

router.get('/', jwtChecker, examController.getList);

module.exports = router;
