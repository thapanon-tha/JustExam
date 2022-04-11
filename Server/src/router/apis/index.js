const router = require('express').Router();
const jwtChecker = require('../../middlewares/jwt');

// * SUCCESS
// TODO
// ? INPROSESS

// *
router.use('/user', jwtChecker, require('./User'));

// *
router.use('/exams', jwtChecker, require('./Exam'));

// *
// /exams/:id/question

// *
router.use('/categorys',jwtChecker, require('./Category'));

// *
router.use('/questionsType',jwtChecker, require('./QuestionsType'));

// *
router.use('/channels', jwtChecker, require('./Channel'));
// *

// *
router.use('/roles',jwtChecker, require('./Role'));

// *
router.use('/optionTypes',jwtChecker, require('./OptionType'));

module.exports = router;
