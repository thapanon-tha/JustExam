const router = require('express').Router();

router.get('/login/google', (req, res) => {
  res.send(`<a href="/api/auth/google">Authenticate with Google</a> <br> 
  <a href="/api/auth/google/createAccount?role=student">create  with Google to be student</a> <br>
  <a href="/api/auth/google/createAccount?role=teacher">create  with Google to be teacher</a>`);
});

// * SUCCESS
// TODO
// ? INPROSESS

// *
router.use('/user', require('./User'));

// *
router.use('/exams', require('./Exam'));

// *
// /exams/:id/question

// *
router.use('/categorys', require('./Category'));

// *
router.use('/questionsType', require('./QuestionsType'));

// *
router.use('/channels', require('./Channel'));
// *
// /channels/:id/members
// /channels/:id/score
// /channels/:id/options
// /channel/:cid/answer
// /channels/:id/exams
// /channels/:cid/exams/:ecid/sectionTime
// /channels/:cid/exams/:ecid/question

// *
router.use('/roles', require('./Role'));

// *
router.use('/optionTypes', require('./OptionType'));

module.exports = router;
